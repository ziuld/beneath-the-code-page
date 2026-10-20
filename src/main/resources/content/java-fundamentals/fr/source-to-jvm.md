## Ce que vous allez apprendre

Un fichier source Java et le programme qui s’exécute ne sont pas le même artefact. Dans cette unité, vous compilerez un petit fichier source, exécuterez sa classe compilée et expliquerez ce qui se passe lorsque le code source change. Il s’agit d’une unité complète, pas du cours complet sur les bases de Java.

Vous pouvez tout lire sans installer Java. Pour reproduire les commandes, utilisez le JDK 25 et un terminal ouvert dans un répertoire où vous pouvez créer un fichier. Aucune connaissance préalable de Java n’est nécessaire.

## Trois étapes aux rôles différents

- Le **code source** est le texte que vous écrivez dans un fichier `.java`.
- La **compilation** vérifie le code source et produit un fichier `.class` contenant du bytecode et des informations sur la classe. L’outil `javac` réalise cette étape.
- L’**exécution** charge la classe compilée dans une machine virtuelle Java (JVM) compatible et exécute le programme. Le lanceur `java` démarre l’environnement d’exécution de cet exemple.

```text
Main.java                    out/Main.class                    sortie du programme
(texte source) -- javac --> (bytecode compilé) -- JVM --> Hello, JVM!
                                                  ^
                                       java -cp out Main
```

La première flèche représente la compilation, pas l’exécution. La seconde indique que la JVM exécute la classe compilée choisie par le lanceur. Le chemin de classes `out` indique au lanceur où chercher cette classe.

Le **JDK** est le kit de développement : il comprend des outils comme `javac` et les composants d’exécution utilisés par `java`. La **JVM** est le moteur d’exécution, pas le fichier source ni le kit de développement lui-même. Une implémentation de la JVM peut interpréter le bytecode et compiler certaines parties en instructions natives grâce à la compilation à la volée (JIT). Ne supposez pas que toutes les implémentations interprètent toujours chaque instruction ou compilent toujours tout avant l’exécution.

Le bytecode ne garantit pas que n’importe quelle version de Java puisse exécuter n’importe quelle classe. L’environnement doit prendre en charge la version du fichier de classe et les API utilisées par le programme. Ici, utilisez le JDK 25 pour les deux commandes.

## Exemple détaillé : compiler, puis exécuter

Enregistrez exactement ce programme dans `Main.java`. Sa méthode `main` conventionnelle est le point d’entrée utilisé ici ; il n’est pas encore nécessaire de mémoriser toute sa déclaration.

```java
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, JVM!");
    }
}
```

Depuis le répertoire contenant `Main.java`, compilez le programme puis exécutez la classe obtenue :

```sh
javac -d out Main.java
java -cp out Main
```

Une compilation réussie crée `out/Main.class` et n’affiche normalement rien. L’exécution de la classe affiche :

```text
Hello, JVM!
```

Utilisez le nom de classe `Main`, pas le nom de fichier `Main.class`, dans la commande de lancement. Ces commandes séparent volontairement compilation et exécution. Java propose aussi des modes de lancement à partir d’un fichier source, mais ce n’est pas le fonctionnement étudié ici.

## Exercice : quel artefact est exécuté ?

1. Effectuez la compilation et l’exécution précédentes.
2. Dans `Main.java`, remplacez uniquement le message `Hello, JVM!` par `Hello, bytecode!`, puis enregistrez le fichier.
3. Sans relancer `javac`, exécutez :

```sh
java -cp out Main
```

Prévoyez la sortie. Compilez ensuite le code source modifié et relancez le programme :

```sh
javac -d out Main.java
java -cp out Main
```

Pourquoi les deux exécutions donnent-elles des résultats différents ?

## Réponse et raisonnement

L’exécution sans recompilation affiche toujours `Hello, JVM!`. Vous avez changé le texte source, mais le lanceur sélectionne encore le fichier `out/Main.class` existant. Cet artefact compilé contient le message d’origine ; modifier le code source ne le met pas automatiquement à jour.

Après une recompilation réussie, l’exécution affiche `Hello, bytecode!`. Le compilateur a remplacé le fichier de classe par un fichier produit à partir du code source modifié. La JVM exécute maintenant l’artefact actualisé.

Si la recompilation échoue, ne supposez pas que l’ancien fichier de classe a disparu : vous pouvez encore exécuter le résultat d’une compilation antérieure réussie. Vérifiez le résultat du compilateur avant de considérer une exécution comme une preuve du comportement de votre dernier code source.

## Vérifiez votre compréhension

Expliquez les deux flèches du diagramme avec vos propres mots. Quelle commande modifie l’artefact compilé et laquelle le sélectionne pour l’exécuter ? Si vous pouvez expliquer pourquoi la modification du code source seule n’a pas changé la sortie, vous avez compris le modèle présenté dans cette unité.

Le site web ne compile pas votre code et ne le transmet pas. Les commandes ci-dessus sont destinées à votre propre terminal local ; la leçon et sa réponse restent lisibles sans JavaScript.
