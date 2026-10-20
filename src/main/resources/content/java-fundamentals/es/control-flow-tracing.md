## Qué aprenderás

Un programa no ejecuta todas las líneas una sola vez de arriba abajo. Una bifurcación selecciona un camino; un bucle vuelve a una decisión anterior. Aprenderás a seguir ambos anotando los valores actuales, la siguiente condición y la instrucción que se ejecuta después.

Lee primero la unidad sobre valores y tipos. Esta lección utiliza valores `int` pequeños, asignación, suma y comparaciones. Puedes leer sin instalar nada; para ejecutar los ejemplos localmente, utiliza el JDK 25 y el procedimiento de compilación y ejecución de la primera unidad. El sitio no ejecuta ni recibe tu código.

## Una bifurcación elige un camino

La condición de un `if` da un resultado booleano: `true` o `false`. En un `if`/`else`, una condición verdadera selecciona el primer bloque; una falsa selecciona el bloque `else`. Solo se ejecuta el bloque elegido para esa decisión. Después, la ejecución continúa tras la instrucción completa.

Las llaves `{` y `}` agrupan instrucciones en un bloque. Úsalas incluso para una sola instrucción, de modo que el camino previsto quede claro. Para números, `==` compara valores; `=` asigna un valor. Tienen funciones distintas. Las comparaciones `<` y `<=` significan «menor que» y «menor o igual que».

Una condición utiliza los valores disponibles cuando se evalúa. No es una propiedad permanente de una variable: cambiar esa variable puede cambiar la siguiente decisión. Dos instrucciones `if` independientes evalúan cada una su condición; no equivalen a una única elección `if`/`else`.

## Un bucle es una secuencia de decisiones

El bucle `for` básico de esta lección tiene tres partes: inicializar el contador, comprobar la condición y actualizar el contador. La inicialización ocurre una vez. La condición se comprueba antes de cada ejecución del cuerpo; cuando el cuerpo termina normalmente, se realiza la actualización y se vuelve a comprobar la condición.

```text
inicializar una vez
        |
        v
¿condición? -- falsa --> instrucción siguiente al bucle
        |
     verdadera
        |
        v
cuerpo (con su bifurcación) --> actualizar --> comprobar de nuevo
```

Un bucle `while` también comprueba antes de ejecutar su cuerpo. No tiene un apartado separado para actualizar: quien programa debe organizar los cambios de estado necesarios, a menudo dentro del cuerpo. Cualquiera de los dos bucles puede ejecutar su cuerpo cero veces si la primera condición es falsa.

Este modelo cubre los ejemplos, que no tienen `break`, `continue`, una salida del método ni una excepción dentro del bucle. Esas construcciones pueden cambiar el camino; no supongas que todos los bucles siguen siempre el diagrama completo.

## Ejemplo resuelto: traza antes de ejecutar

Guarda este programa como `ControlFlowTrace.java`. `%` calcula el resto entero; aquí `n % 2 == 0` es verdadero para valores pares de `n`. La pareja impresa contiene el contador y el total después de la bifurcación elegida.

```java
public class ControlFlowTrace {
    public static void main(String[] args) {
        int total = 0;
        for (int n = 1; n <= 4; n = n + 1) {
            if (n % 2 == 0) {
                total = total + n;
            } else {
                total = total + 1;
            }
            System.out.println(n + " " + total);
        }
        System.out.println(total);
    }
}
```

Escribe una traza antes de compilar. Empieza con `total = 0`; evalúa la condición en cada visita, no solo en la primera.

```text
n   n <= 4   n % 2 == 0   total antes -> después
1   true     false       0 -> 1
2   true     true        1 -> 3
3   true     false       3 -> 4
4   true     true        4 -> 8
5   false    sin evaluar 8 -> 8   (el cuerpo no se ejecuta)
```

Para `n = 3`, la rama falsa suma `1`, no `3`. Después del cuerpo con `n = 4`, la actualización todavía se ejecuta y produce `n = 5`. La condición pasa a ser falsa, por lo que no aparece una línea `5 8`. La impresión final, fuera del bucle, muestra el total una vez.

```sh
javac -d out ControlFlowTrace.java
java -cp out ControlFlowTrace
```

La salida es:

```text
1 1
2 3
3 4
4 8
8
```

La variable `n` declarada en la inicialización del `for` pertenece al ámbito de ese bucle. La impresión final utiliza `total`, declarado fuera. No añadas una impresión de esa `n` después del bucle esperando que siga disponible allí.

## Límites y terminación

La diferencia entre `< 4` y `<= 4` se puede observar. En el programa resuelto, `< 4` visita `1`, `2` y `3`, dejando un total final de `4`. `<= 4` también visita `4` y da `8`. Ningún operador es correcto por sí solo; elige el que incluya exactamente los valores previstos.

En este ejemplo, la terminación se deduce de un contador pequeño y acotado: empieza en `1`, aumenta de `1` en `1` y finalmente incumple la condición al llegar a `5`. Esos valores caben en `int`. «El contador aumenta» no demuestra que cualquier bucle con enteros termine: cerca del límite del tipo puede importar el desbordamiento de la unidad anterior.

Un punto y coma justo después de la cabecera, como en `while (condition);`, crea un cuerpo de bucle vacío. La sangría no incorpora las instrucciones posteriores al cuerpo. Conserva las llaves y sigue las instrucciones reales, no su alineación visual.

## Ejercicio: traza un bucle while

Guarda lo siguiente como `ControlFlowExercise.java`. Predice las dos líneas impresas y explica cada visita a la condición.

```java
public class ControlFlowExercise {
    public static void main(String[] args) {
        int n = 1;
        int total = 0;
        while (n < 4) {
            if (n == 2) {
                total = total + 10;
            } else {
                total = total + n;
            }
            n = n + 1;
        }
        System.out.println(n);
        System.out.println(total);
    }
}
```

Compila con `javac -d out ControlFlowExercise.java` y ejecuta `java -cp out ControlFlowExercise`.

1. ¿Por qué el contador final es mayor que el último contador utilizado por el cuerpo?
2. Si la condición pasa a ser `n <= 4`, ¿cuáles son las dos salidas?
3. Restaura `n < 4`, pero empieza con `n = 4`. ¿Qué ocurre?
4. Si se elimina `n = n + 1;` del programa original, ¿puede la condición pasar a ser falsa? Razona sobre esta variante; no ejecutes deliberadamente un programa que no termina.

## Respuesta y razonamiento

```text
4
14
```

En el programa original, el cuerpo encuentra `n = 1`, después `2` y luego `3`. El total pasa de `0` a `1`, después a `11` y finalmente a `14`. La actualización tras el tercer cuerpo asigna `n = 4`; la siguiente comprobación falla. Por eso el contador final es `4`, aunque el cuerpo vio `3` por última vez.

Con `n <= 4`, una iteración más suma `4`. El contador final es `5` y el total es `18`.

Empezar con `n = 4` y `n < 4` hace que la primera comprobación sea falsa. El cuerpo se ejecuta cero veces; las salidas son `4` y `0`.

Sin la actualización, `n` permanece en `1`. Sumar a `total` no cambia `n`, así que `n < 4` sigue siendo verdadero. Aunque `total` acabe desbordándose, la condición sigue dependiendo solo de `n`, que no cambia. Esta variante no termina normalmente.

## Comprueba lo que has entendido

Para cada bucle, identifica el estado inicial, la condición, la rama elegida, la actualización y el estado de salida. Incluye la última condición falsa en la traza. ¿Puedes predecir cero, una y varias iteraciones antes de ejecutar el programa?

Los ejemplos originales siguen las reglas de Java 25 para [if/else](https://docs.oracle.com/javase/specs/jls/se25/html/jls-14.html#jls-14.9), [while](https://docs.oracle.com/javase/specs/jls/se25/html/jls-14.html#jls-14.12) y [for básico](https://docs.oracle.com/javase/specs/jls/se25/html/jls-14.html#jls-14.14.1). Las instrucciones switch, los streams y el control avanzado de bucles quedan fuera de esta unidad.
