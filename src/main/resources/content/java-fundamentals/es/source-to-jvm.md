## Qué aprenderás

Un archivo de código fuente de Java y el programa que se ejecuta no son el mismo artefacto. En esta unidad compilarás un archivo pequeño, ejecutarás su clase compilada y explicarás qué ocurre al cambiar el código fuente. Es una unidad completa, no el curso completo de Fundamentos de Java.

Puedes leerlo todo sin instalar Java. Para reproducir los comandos, utiliza el JDK 25 y una terminal situada en un directorio donde puedas crear un archivo. No necesitas conocimientos previos de Java.

## Tres etapas con funciones diferentes

- El **código fuente** es el texto que escribes en un archivo `.java`.
- La **compilación** comprueba el código fuente y produce un archivo `.class` que contiene bytecode e información de la clase. La herramienta `javac` realiza este paso.
- La **ejecución** carga la clase compilada en una máquina virtual de Java (JVM) compatible y ejecuta el programa. El lanzador `java` inicia el entorno de ejecución de este ejemplo.

```text
Main.java                   out/Main.class                    salida del programa
(texto fuente) -- javac --> (bytecode compilado) -- JVM --> Hello, JVM!
                                                   ^
                                        java -cp out Main
```

La primera flecha representa la compilación, no la ejecución. La segunda indica que la JVM ejecuta la clase compilada seleccionada por el lanzador. La ruta de clases `out` indica dónde debe buscar esa clase.

El **JDK** es el kit de desarrollo: incluye herramientas como `javac` y los componentes de ejecución que utiliza `java`. La **JVM** es el motor de ejecución, no el archivo fuente ni el propio kit de desarrollo. Una implementación de la JVM puede interpretar bytecode y compilar algunas partes a instrucciones nativas mediante compilación justo a tiempo (JIT). No supongas que todas las implementaciones siempre interpretan cada instrucción ni que siempre compilan todo antes de ejecutarlo.

El bytecode no garantiza que cualquier versión de Java pueda ejecutar cualquier clase. El entorno debe admitir la versión del archivo de clase y las API que utiliza el programa. Aquí utilizaremos el JDK 25 para ambos comandos.

## Ejemplo resuelto: compilar y después ejecutar

Guarda este programa exacto como `Main.java`. Su método `main` convencional es el punto de entrada de este ejemplo; todavía no necesitas memorizar toda su declaración.

```java
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, JVM!");
    }
}
```

Desde el directorio que contiene `Main.java`, compila el programa y ejecuta la clase resultante:

```sh
javac -d out Main.java
java -cp out Main
```

Una compilación correcta crea `out/Main.class` y normalmente no imprime nada. La ejecución de la clase imprime:

```text
Hello, JVM!
```

Utiliza el nombre de clase `Main`, no el nombre de archivo `Main.class`, en el comando de ejecución. Estos comandos muestran deliberadamente la compilación y la ejecución por separado. Java también permite iniciar programas a partir de archivos fuente, pero ese no es el flujo que seguimos aquí.

## Ejercicio: ¿qué artefacto se ejecuta?

1. Completa la compilación y la ejecución anteriores.
2. En `Main.java`, cambia únicamente el saludo `Hello, JVM!` por `Hello, bytecode!` y guarda el archivo.
3. Sin volver a ejecutar `javac`, ejecuta:

```sh
java -cp out Main
```

Predice la salida. Después compila el código fuente modificado y vuelve a ejecutar:

```sh
javac -d out Main.java
java -cp out Main
```

¿Por qué son diferentes las dos ejecuciones?

## Respuesta y razonamiento

La ejecución sin recompilar sigue imprimiendo `Hello, JVM!`. Has cambiado el texto fuente, pero el lanzador sigue seleccionando el archivo `out/Main.class` que ya existía. Ese artefacto compilado contiene el saludo original; editar el código fuente no lo actualiza automáticamente.

Después de recompilar correctamente, la ejecución imprime `Hello, bytecode!`. El compilador ha sustituido el archivo de clase por otro generado a partir del código fuente modificado. La JVM ejecuta ahora el artefacto actualizado.

Si la recompilación falla, no supongas que el archivo de clase anterior ha desaparecido: aún puedes ejecutar el resultado de una compilación correcta anterior. Comprueba el resultado del compilador antes de considerar una ejecución como prueba de tu código fuente más reciente.

## Comprueba lo que has entendido

Explica con tus propias palabras las dos flechas del diagrama. ¿Qué comando modifica el artefacto compilado y cuál lo selecciona para ejecutarlo? Si puedes explicar por qué editar únicamente el código fuente no cambió la salida, has comprendido el modelo mental de esta unidad.

El sitio web no compila ni envía tu código. Los comandos anteriores son para tu propia terminal local; la lección y su respuesta siguen siendo legibles sin JavaScript.
