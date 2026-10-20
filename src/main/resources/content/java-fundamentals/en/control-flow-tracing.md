## What you will learn

A program does not run every line once from top to bottom. A branch selects a path; a loop returns to an earlier decision. You will trace both by writing down the current values, the next condition and the statement that runs next.

Read the values/types unit first. This lesson uses small `int` values, assignment, addition and comparisons. You can read without installing anything; to run the examples locally, use JDK 25 and the compile/run workflow from the first unit. The website does not execute or receive your code.

## A branch chooses one path

An `if` condition has a boolean result: `true` or `false`. In an `if`/`else`, a true condition selects the first block; a false condition selects the `else` block. Only the selected block runs for that decision. Execution then continues after the whole statement.

Braces `{` and `}` group statements into a block. Use them even for one statement so the intended path stays clear. For numbers, `==` compares values; `=` assigns a value. They have different jobs. Comparisons such as `<` and `<=` mean “less than” and “less than or equal to”.

A condition uses the values available when it is evaluated. It is not a permanent fact about a variable: changing that variable can change the next decision. Two separate `if` statements each evaluate their own condition; they are not the same as one `if`/`else` choice.

## A loop is a sequence of decisions

The basic `for` loop in this lesson has three parts: initialise the counter, test the condition and update the counter. The initialisation happens once. The condition is tested before each body execution; after the body finishes normally, the update runs and control returns to the test.

```text
initialise once
      |
      v
condition? -- false --> next statement after loop
      |
     true
      |
      v
body (including any branch) --> update --> test condition again
```

A `while` loop also tests before its body. It has no separate update slot: the programmer must arrange for relevant state to change, often in the body. Either loop can execute its body zero times when its first condition is false.

This model covers the examples here, which have no `break`, `continue`, return from the method or exception inside the loop. Those constructs can change the path; do not assume every loop always follows the full diagram.

## Worked example: trace before running

Save this program as `ControlFlowTrace.java`. `%` gives the integer remainder; here `n % 2 == 0` is true for even values of `n`. The printed pair contains the counter and the total after the selected branch.

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

Write a trace before compiling. Start with `total = 0`; evaluate the condition at each visit, not just the first one.

```text
n   n <= 4   n % 2 == 0   total before -> after
1   true     false       0 -> 1
2   true     true        1 -> 3
3   true     false       3 -> 4
4   true     true        4 -> 8
5   false    not tested  8 -> 8   (body does not run)
```

For `n = 3`, the false branch adds `1`, not `3`. After the `n = 4` body, the update still runs and produces `n = 5`. The condition is then false, so there is no `5 8` output line. The final print, outside the loop, prints the total once.

```sh
javac -d out ControlFlowTrace.java
java -cp out ControlFlowTrace
```

The output is:

```text
1 1
2 3
3 4
4 8
8
```

The `n` declared in the `for` initialisation belongs to that loop’s scope. The final print uses `total`, declared outside it. Do not add a print of that `n` after the loop and expect it to be available there.

## Boundaries and termination

The difference between `< 4` and `<= 4` is observable. In the worked program, `< 4` visits `1`, `2` and `3`, leaving a final total of `4`. `<= 4` also visits `4`, giving `8`. Neither operator is automatically correct; choose the one that includes exactly the intended values.

For this example, termination follows from a small bounded counter: it starts at `1`, increases by `1` and eventually fails the test at `5`. These values fit in `int`. “The counter increases” is not a proof for arbitrary integer loops: overflow from the previous unit can matter near the type’s limit.

A semicolon immediately after a loop header, as in `while (condition);`, creates an empty loop body. Indentation does not attach later statements to it. Keep the braces and trace the actual statements, not the visual alignment.

## Exercise: trace a while loop

Save the following as `ControlFlowExercise.java`. Predict the two printed lines and explain every visit to the condition.

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

Compile with `javac -d out ControlFlowExercise.java`, then run `java -cp out ControlFlowExercise`.

1. Why is the final counter larger than the last counter used by the body?
2. If the condition becomes `n <= 4`, what are the two outputs?
3. Restore `n < 4`, but start with `n = 4`. What happens?
4. If the update `n = n + 1;` is removed from the original program, can the condition become false? Reason about this variant; do not run a deliberately nonterminating program.

## Answer and reasoning

```text
4
14
```

With the original program, the body sees `n = 1`, then `2`, then `3`. The total changes from `0` to `1`, then to `11`, then to `14`. The update after the third body sets `n = 4`; the next test fails. That is why the final counter is `4`, even though the body last saw `3`.

With `n <= 4`, one more iteration adds `4`. The final counter is `5` and the total is `18`.

Starting at `n = 4` with `n < 4` makes the first test false. The body runs zero times; the outputs are `4` and `0`.

Without the update, `n` stays at `1`. Adding to `total` does not change `n`, so `n < 4` stays true. Even if `total` eventually overflows, this condition still depends only on the unchanged `n`. This variant does not terminate normally.

## Check your understanding

For each loop, identify the initial state, the test, the selected branch, the update and the state at exit. Include the final false condition in your trace. Can you predict zero, one and several iterations without running the program first?

The original examples follow Java 25’s rules for [if/else](https://docs.oracle.com/javase/specs/jls/se25/html/jls-14.html#jls-14.9), [while](https://docs.oracle.com/javase/specs/jls/se25/html/jls-14.html#jls-14.12) and [basic for loops](https://docs.oracle.com/javase/specs/jls/se25/html/jls-14.html#jls-14.14.1). Switch statements, streams and advanced loop control are outside this unit.
