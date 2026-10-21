import java.net.URI;
import java.net.HttpURLConnection;
import java.nio.charset.StandardCharsets;

/** Small runtime probe; no application dependencies or external network. */
public final class HealthCheck {
    public static void main(String[] args) {
        try {
            var connection = (HttpURLConnection) URI.create("http://127.0.0.1:8080/actuator/health").toURL().openConnection();
            connection.setConnectTimeout(2000);
            connection.setReadTimeout(2000);
            if (connection.getResponseCode() != 200) System.exit(1);
            try (var input = connection.getInputStream()) {
                var body = new String(input.readNBytes(1024), StandardCharsets.UTF_8);
                if (!body.replaceAll("\\s", "").contains("\"status\":\"UP\"")) System.exit(1);
            }
            connection.disconnect();
        } catch (Exception exception) {
            System.exit(1);
        }
    }
}
