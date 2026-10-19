## What you will learn

A Java source file and the program that runs are not the same artifact. In this unit, you will compile a small source file, run its compiled class and explain what happens when the source changes. This is one complete unit, not the complete Java Fundamentals course.

You can read everything without installing Java. To follow the commands yourself, use JDK 25 and a terminal in a directory where you can create a file. No previous Java knowledge is required.

## Three stages, three different roles

- **Source code** is the text you write in a `.java` file.
- **Compilation** checks the source and produces a `.class` file containing bytecode and class information. The `javac` tool performs this step.
- **Execution** loads the compiled class into a compatible Java Virtual Machine (JVM) and runs the program. The `java` launcher starts the runtime for this example.

```text
Main.java                 out/Main.class                 program output
(source text) -- javac --> (compiled bytecode) -- JVM --> Hello, JVM!
                                               ^
                                    java -cp out Main
```

The first arrow means compilation, not execution. The second means that the JVM executes the compiled class selected by the launcher. The class path `out` tells the launcher where to look for that class.

The **JDK** is the development kit: it includes tools such as `javac` and the runtime components used by `java`. The **JVM** is the execution engine, not the source file or the development kit itself. A JVM implementation may interpret bytecode and may compile parts to native instructions using just-in-time (JIT) compilation. Do not assume that every implementation always interprets each instruction or always compiles everything first.

Bytecode is not a promise that any Java version can run any class. The runtime must support the class-file version and the APIs used by the program. Here, use JDK 25 for both commands.

## Worked example: compile, then run

Save this exact program as `Main.java`. Its conventional `main` method is the entry point used in this example; you do not need to memorise the full declaration yet.

```java
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, JVM!");
    }
}
```

From the directory containing `Main.java`, compile it and run the resulting class:

```sh
javac -d out Main.java
java -cp out Main
```

Successful compilation creates `out/Main.class` and normally prints nothing. Running the class prints:

```text
Hello, JVM!
```

Use the class name `Main`, not the filename `Main.class`, in the launch command. These commands deliberately show compilation and execution separately. Java also has source-file launch modes, but they are not the workflow being traced here.

## Exercise: which artifact is executed?

1. Complete the compilation and run above.
2. Change only the greeting in `Main.java` from `Hello, JVM!` to `Hello, bytecode!`, then save the file.
3. Without running `javac` again, run:

```sh
java -cp out Main
```

Predict the output. Then compile the edited source and run again:

```sh
javac -d out Main.java
java -cp out Main
```

Why do the two runs differ?

## Answer and reasoning

The run without recompilation still prints `Hello, JVM!`. You changed the source text, but the launcher still selected the existing `out/Main.class`. That compiled artifact contains the original greeting; editing the source does not update it automatically.

After successful recompilation, the run prints `Hello, bytecode!`. The compiler has replaced the class file with one generated from the edited source. The JVM now executes the updated artifact.

If recompilation fails, do not assume an older class file has disappeared: running it can still execute an earlier successful build. Check the compiler result before trusting a run as evidence of your latest source.

## Check your understanding

Explain the two arrows in the diagram in your own words. Which command changes the compiled artifact, and which selects it for execution? If you can explain why editing source alone did not change the output, you have the mental model this unit teaches.

The website does not compile or submit your code. The commands above are for your own local terminal; the lesson and its answer remain readable without JavaScript.
