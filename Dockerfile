FROM eclipse-temurin:25.0.4.1_1-jdk-noble@sha256:ba0f0e1a33864105e1d454e88105c617ab40f71062db1f306bf58be32a3f8e5e AS build
RUN apt-get update && apt-get install -y --no-install-recommends unzip \
    && rm -rf /var/lib/apt/lists/*
WORKDIR /build
ENV MAVEN_USER_HOME=/build/.mvn/local-repository
COPY --chmod=755 mvnw ./mvnw
COPY pom.xml ./
COPY .mvn/wrapper/ .mvn/wrapper/
COPY src/ src/
COPY docs/reference/logo-composition-original.png docs/reference/logo-composition-original.png
RUN ./mvnw --batch-mode --no-transfer-progress verify
COPY docker/HealthCheck.java docker/HealthCheck.java
RUN javac -d /health docker/HealthCheck.java

# Optional development shell/checks; bind a Docker-only checkout at /workspace.
FROM eclipse-temurin:25.0.4.1_1-jdk-noble@sha256:ba0f0e1a33864105e1d454e88105c617ab40f71062db1f306bf58be32a3f8e5e AS development
RUN apt-get update && apt-get install -y --no-install-recommends unzip python3 git \
    && rm -rf /var/lib/apt/lists/*
WORKDIR /workspace
ENV HOME=/tmp MAVEN_USER_HOME=/workspace/.mvn/local-repository
USER 1000:1000
CMD ["python3", "scripts/verify-java-baseline.py"]

FROM eclipse-temurin:25.0.4.1_1-jre-noble@sha256:3f2223fe04b750aa5a8179e29b5c9a1ddf7665fc9bb08bfe11ad01d143bc13a5
WORKDIR /app
COPY --from=build /build/target/beneath-the-code-0.1.0-SNAPSHOT.jar /app/application.jar
COPY --from=build /health/HealthCheck.class /app/health/HealthCheck.class
USER 10001:10001
EXPOSE 8080
HEALTHCHECK --interval=10s --timeout=5s --start-period=30s --retries=3 CMD ["java", "-cp", "/app/health", "HealthCheck"]
ENTRYPOINT ["java", "-Djava.io.tmpdir=/tmp", "-jar", "/app/application.jar"]
CMD ["--spring.profiles.active=container"]
