## Qué aprenderás

El tipo declarado de una variable limita sus valores posibles y ayuda a determinar cómo se evalúa una expresión. Un destino más amplio no amplía un cálculo que ya se ha realizado. En esta unidad predecirás desbordamientos de enteros, explicarás la división entera y reconocerás por qué algunos cálculos decimales son aproximados.

Lee primero la unidad sobre el recorrido del código fuente a la JVM. Puedes leer esta lección sin instalar nada. Para reproducir los ejemplos, utiliza el JDK 25 y el procedimiento de compilación y ejecución de la primera unidad. El sitio no ejecuta ni recibe tu código.

## El tipo forma parte del cálculo

En `int count = 7;`, `int` es el tipo declarado, `count` es el nombre de la variable y `7` es su valor inicial. Una asignación como `count = 9;` sustituye el valor de esa variable; no cambia su tipo. Las variables locales deben recibir un valor antes de leerse.

Java tiene ocho tipos primitivos:

- `byte`: enteros de −128 a 127; `short`: de −32768 a 32767.
- `int`: enteros de −2147483648 a 2147483647.
- `long`: enteros de −9223372036854775808 a 9223372036854775807. El sufijo `L` convierte un literal entero en un literal de tipo `long`, por ejemplo `3_000_000_000L`.
- `char`: una unidad de código UTF-16 sin signo, de 0 a 65535. No siempre representa un carácter Unicode completo; algunos caracteres necesitan dos unidades de código.
- `float` y `double`: valores de coma flotante binaria, con unas 7 y 15–16 cifras decimales significativas, respectivamente. Son orientaciones sobre la precisión, no garantías de que cualquier decimal sea exacto. También admiten infinitos y NaN, un valor especial que significa «no es un número». Un literal decimal como `2.0` tiene tipo `double`; `2.0f` tiene tipo `float`.
- `boolean`: `true` o `false`, no los valores numéricos 0 y 1.

Los guiones bajos dentro de los literales numéricos, como en `2_000`, facilitan la lectura sin cambiar el valor. Las operaciones aritméticas con `byte`, `short` y `char` normalmente los promocionan a `int`. En la suma de enteros que veremos, dos operandos `int` producen un resultado `int`; un operando `long` convierte la suma en un cálculo de tipo `long`.

```text
expresión int -- evaluar como int --> resultado int -- asignar --> variable long
                 puede desbordarse                  ampliar llega tarde

operando long + operando int -- evaluar como long --> resultado long
```

El diagrama describe la evaluación y la asignación, no la disposición física de la memoria. `long` también tiene límites; ampliar solo ayuda cuando el resultado cabe en el tipo elegido.

## Ejemplo resuelto: predice antes de ejecutar

Guarda el siguiente programa como `NumericValues.java`. Predice las siete líneas de salida antes de compilar.

```java
public class NumericValues {
    public static void main(String[] args) {
        int largest = 2_147_483_647;
        System.out.println(largest + 1);
        System.out.println((long) largest + 1);
        System.out.println((long) (largest + 1));
        System.out.println(5 / 2);
        System.out.println(5 / 2.0);
        System.out.println(0.1 + 0.2);
        int original = 7;
        int copy = original;
        copy = 9;
        System.out.println(original + " " + copy);
    }
}
```

Compila y ejecuta desde el mismo directorio:

```sh
javac -d out NumericValues.java
java -cp out NumericValues
```

La salida es:

```text
-2147483648
2147483648
-2147483648
2
2.5
0.30000000000000004
7 9
```

Estos son los motivos de cada resultado:

1. `largest + 1` se evalúa como `int`. La suma ordinaria de enteros da la vuelta al rango cuando se desborda; el resultado es el mínimo `int`, no una excepción.
2. `(long) largest + 1` amplía un operando antes de sumar. Este resultado cabe en un `long`.
3. `(long) (largest + 1)` realiza primero la suma `int` que se desborda. La conversión conserva después ese valor negativo, que ya no coincide con tu intención; no recupera el resultado perdido.
4. `5 / 2` utiliza división entera, que descarta la parte fraccionaria hacia cero. El resultado es `2`.
5. `5 / 2.0` utiliza división de coma flotante porque `2.0` es un `double`; este resultado es `2.5`.
6. Los valores binarios `double` usados para `0.1` y `0.2` son aproximaciones. Al sumarlos se obtiene el valor mostrado, `0.30000000000000004`. Imprimir un decimal corto no demuestra que el valor almacenado sea exacto. Los cálculos monetarios decimales exactos requieren elegir una representación decimal, no dar por hecho que `double` sea adecuado.
7. `copy = original` copia el valor primitivo `7`. Asignar `9` a `copy` deja `original` sin cambios.

## Valores primitivos y valores de referencia

`String` no es un noveno tipo primitivo. Una variable de tipo referencia contiene una referencia a un objeto o `null`, que no se refiere a ningún objeto. Asignar una variable de referencia a otra copia el valor de la referencia; no copia el objeto. Ambas variables pueden referirse entonces al mismo objeto. Copiar un valor primitivo no crea ese estado compartido de un objeto.

```text
asignación primitiva: original [7]    copy [7]  (valores independientes)
asignación de referencia: first -----> objeto
                          second ----> el mismo objeto
```

Esta es una distinción conceptual, no una regla según la cual todos los primitivos vivan en una región de memoria y todas las referencias en otra. La modificación de objetos y los argumentos de métodos corresponden a unidades posteriores; aquí solo distinguimos qué copia una asignación.

## Ejercicio: ¿el destino arregla el cálculo?

Predice las tres líneas que imprime este programa. Explica qué operación ocurre antes de cada asignación. Guárdalo como `NumericExercise.java`.

```java
public class NumericExercise {
    public static void main(String[] args) {
        int tickets = 2_000_000_000;
        long tooLate = tickets + tickets;
        long widenedFirst = (long) tickets + tickets;
        double quotient = 5 / 2;
        System.out.println(tooLate);
        System.out.println(widenedFirst);
        System.out.println(quotient);
    }
}
```

Compila con `javac -d out NumericExercise.java` y ejecuta `java -cp out NumericExercise`. ¿Qué dos cambios en las expresiones harían que el primer resultado fuera `4000000000` y el último, `2.5`?

## Respuesta y razonamiento

```text
-294967296
4000000000
2.0
```

`tickets + tickets` suma dos valores `int`. Su suma matemática, 4000000000, está fuera del rango de `int`, por lo que la suma se desborda y da −294967296. Asignar ese resultado a `long tooLate` no deshace el desbordamiento. Amplía un operando antes de sumar, como en `(long) tickets + tickets`; la segunda línea ya demuestra esta corrección.

`5 / 2` produce el entero `2` antes de la asignación. Ampliarlo a `double` da `2.0`. Usa `5 / 2.0` para realizar una división de coma flotante y obtener `2.5`.

## Comprueba lo que has entendido

Antes de confiar en un resultado, identifica los tipos de los operandos, el tipo de la expresión, su rango representable y el momento de cada conversión. ¿Puedes explicar por qué cambiar solo el tipo de destino no arregla ninguno de los dos errores del ejercicio?

Consulta la especificación de Java 25 sobre [tipos y valores](https://docs.oracle.com/javase/specs/jls/se25/html/jls-4.html), [división entera](https://docs.oracle.com/javase/specs/jls/se25/html/jls-15.html#jls-15.17.2) y [suma numérica](https://docs.oracle.com/javase/specs/jls/se25/html/jls-15.html#jls-15.18.2) para ver las reglas precisas. Los ejemplos y las explicaciones son material didáctico original, no texto copiado de la especificación.
