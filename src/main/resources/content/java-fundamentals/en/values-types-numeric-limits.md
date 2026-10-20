## What you will learn

A variable’s declared type limits its possible values and helps determine how an expression is evaluated. A larger destination does not make an earlier calculation larger. In this unit, you will predict integer overflow, explain integer division and recognise why some decimal calculations are approximate.

Read the source-to-JVM unit first. You can read this lesson without installing anything. To reproduce its examples, use JDK 25 and the compile/run workflow from the first unit. No website code runner or submission is involved.

## A type is part of the calculation

In `int count = 7;`, `int` is the declared type, `count` is the variable’s name and `7` is its initial value. An assignment such as `count = 9;` replaces that variable’s value; it does not change its type. Local variables must be assigned before they are read.

Java has eight primitive types:

- `byte`: integers from −128 to 127; `short`: −32768 to 32767.
- `int`: integers from −2147483648 to 2147483647.
- `long`: integers from −9223372036854775808 to 9223372036854775807. An `L` suffix makes an integer literal a `long` literal, for example `3_000_000_000L`.
- `char`: one unsigned UTF-16 code unit, from 0 to 65535. It does not always represent a whole Unicode character; some characters need two code units.
- `float` and `double`: binary floating-point values, with about 7 and 15–16 significant decimal digits respectively. These are precision guides, not guarantees that arbitrary decimals are exact. They also support infinities and NaN, a special “not a number” value. A decimal literal such as `2.0` has type `double`; `2.0f` has type `float`.
- `boolean`: `true` or `false`, not a numeric 0 or 1.

Underscores inside numeric literals, as in `2_000`, improve readability without changing the value. Arithmetic on `byte`, `short` and `char` normally promotes them to `int`. For the integer addition here, both `int` operands give an `int` result; using a `long` operand makes the addition a `long` calculation.

```text
int expression -- evaluate as int --> int result -- assign --> long variable
                 overflow can occur             widening is too late

long operand + int operand -- evaluate as long --> long result
```

This diagram describes evaluation and assignment, not a physical memory layout. A `long` has limits too; widening is useful only when the result fits the chosen type.

## Worked example: predict before running

Save the following as `NumericValues.java`. Predict all seven output lines before compiling.

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

Compile and run from the same directory:

```sh
javac -d out NumericValues.java
java -cp out NumericValues
```

The output is:

```text
-2147483648
2147483648
-2147483648
2
2.5
0.30000000000000004
7 9
```

Here is the reason for each result:

1. `largest + 1` is evaluated as `int`. Ordinary integer addition wraps on overflow; the result is the minimum `int`, not an exception.
2. `(long) largest + 1` widens an operand before addition. This result fits in a `long`.
3. `(long) (largest + 1)` performs the overflowing `int` addition first. The cast then preserves that already incorrect-for-your-intent negative value; it cannot recover the lost result.
4. `5 / 2` uses integer division, which discards the fractional part towards zero. The result is `2`.
5. `5 / 2.0` uses floating-point division because `2.0` is a `double`; this result is `2.5`.
6. The binary `double` values used for `0.1` and `0.2` are approximations. Adding them produces the displayed `0.30000000000000004`. Printing a short decimal is not proof that the stored value is exact. Exact decimal money calculations need a deliberate decimal representation, not a blanket assumption that `double` is suitable.
7. `copy = original` copies the primitive value `7`. Assigning `9` to `copy` leaves `original` unchanged.

## Primitive values and reference values

`String` is not a ninth primitive type. A variable of reference type holds a reference to an object, or `null`, which refers to no object. Assigning one reference variable to another copies the reference value; it does not copy the object. Both variables may then refer to the same object. Copying a primitive value does not create such shared object state.

```text
primitive assignment: original [7]    copy [7]  (independent values)
reference assignment: first --------> object
                      second -------> same object
```

This is a conceptual distinction, not a rule that all primitives live in one memory region and all references in another. Object mutation and method arguments belong to later units; this lesson only distinguishes what assignment copies.

## Exercise: does the destination fix the calculation?

Predict the three lines printed by this program. Explain which operation happens before each assignment. Save it as `NumericExercise.java`.

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

Compile with `javac -d out NumericExercise.java`, then run `java -cp out NumericExercise`. What two expression changes would make the first result `4000000000` and the final result `2.5`?

## Answer and reasoning

```text
-294967296
4000000000
2.0
```

`tickets + tickets` adds two `int` values. Their mathematical sum, 4000000000, is outside the `int` range, so the addition wraps to −294967296. Assigning that result to `long tooLate` cannot undo the overflow. Widen an operand before the addition, as in `(long) tickets + tickets`; the second line already demonstrates this correction.

`5 / 2` produces the integer `2` before assignment. Widening it to `double` gives `2.0`. Use `5 / 2.0` to perform floating-point division and obtain `2.5`.

## Check your understanding

Before trusting a result, identify the operands’ types, the expression’s type, its representable range and when any conversion occurs. Can you explain why changing only the destination type fixes neither of the exercise’s mistakes?

Read the Java 25 specification on [types and values](https://docs.oracle.com/javase/specs/jls/se25/html/jls-4.html), [integer division](https://docs.oracle.com/javase/specs/jls/se25/html/jls-15.html#jls-15.17.2) and [numeric addition](https://docs.oracle.com/javase/specs/jls/se25/html/jls-15.html#jls-15.18.2) for the precise rules. The examples and explanations here are original teaching material, not copied specification text.
