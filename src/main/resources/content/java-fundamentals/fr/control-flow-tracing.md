## Ce que vous allez apprendre

Un programme n’exécute pas chaque ligne une seule fois de haut en bas. Un branchement choisit un chemin ; une boucle revient à une décision antérieure. Vous allez suivre les deux en notant les valeurs actuelles, la prochaine condition et l’instruction exécutée ensuite.

Lisez d’abord l’unité sur les valeurs et les types. Cette leçon utilise de petites valeurs `int`, l’affectation, l’addition et les comparaisons. Vous pouvez lire sans rien installer ; pour exécuter les exemples localement, utilisez le JDK 25 et la démarche de compilation et d’exécution de la première unité. Le site n’exécute pas votre code et ne le reçoit pas.

## Un branchement choisit un chemin

La condition d’un `if` produit un résultat booléen : `true` ou `false`. Dans un `if`/`else`, une condition vraie sélectionne le premier bloc ; une condition fausse sélectionne le bloc `else`. Seul le bloc choisi est exécuté pour cette décision. L’exécution continue ensuite après l’instruction complète.

Les accolades `{` et `}` regroupent des instructions dans un bloc. Utilisez-les même pour une seule instruction afin de garder le chemin prévu explicite. Pour les nombres, `==` compare les valeurs ; `=` affecte une valeur. Leurs rôles sont différents. Les comparaisons `<` et `<=` signifient « inférieur à » et « inférieur ou égal à ».

Une condition utilise les valeurs disponibles au moment de son évaluation. Ce n’est pas une propriété permanente d’une variable : changer cette variable peut modifier la décision suivante. Deux instructions `if` séparées évaluent chacune leur condition ; elles ne correspondent pas à un choix unique `if`/`else`.

## Une boucle est une suite de décisions

La boucle `for` de base de cette leçon comporte trois parties : initialiser le compteur, tester la condition et mettre à jour le compteur. L’initialisation a lieu une fois. La condition est testée avant chaque exécution du corps ; quand le corps se termine normalement, la mise à jour s’exécute, puis le contrôle revient au test.

```text
initialiser une fois
        |
        v
condition ? -- faux --> instruction suivant la boucle
        |
       vrai
        |
        v
corps (avec son branchement) --> mise à jour --> tester de nouveau
```

Une boucle `while` teste elle aussi avant son corps. Elle n’a pas d’emplacement séparé pour la mise à jour : il faut organiser les changements d’état nécessaires, souvent dans le corps. Chacune de ces boucles peut exécuter son corps zéro fois si le premier test est faux.

Ce modèle couvre les exemples, qui n’ont ni `break`, ni `continue`, ni sortie de méthode, ni exception dans la boucle. Ces constructions peuvent changer le chemin ; ne supposez pas que toutes les boucles suivent toujours le schéma complet.

## Exemple guidé : tracer avant d’exécuter

Enregistrez ce programme sous le nom `ControlFlowTrace.java`. `%` calcule le reste entier ; ici, `n % 2 == 0` est vrai pour les valeurs paires de `n`. La paire affichée contient le compteur et le total après le branchement choisi.

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

Écrivez une trace avant de compiler. Commencez avec `total = 0` ; évaluez la condition à chaque passage, pas seulement au premier.

```text
n   n <= 4   n % 2 == 0   total avant -> après
1   true     false       0 -> 1
2   true     true        1 -> 3
3   true     false       3 -> 4
4   true     true        4 -> 8
5   false    non évalué  8 -> 8   (corps non exécuté)
```

Pour `n = 3`, la branche fausse ajoute `1`, pas `3`. Après le corps avec `n = 4`, la mise à jour s’exécute encore et produit `n = 5`. La condition devient alors fausse : aucune ligne `5 8` n’est affichée. L’affichage final, hors de la boucle, écrit le total une seule fois.

```sh
javac -d out ControlFlowTrace.java
java -cp out ControlFlowTrace
```

La sortie est :

```text
1 1
2 3
3 4
4 8
8
```

La variable `n` déclarée dans l’initialisation du `for` appartient à la portée de cette boucle. L’affichage final utilise `total`, déclaré à l’extérieur. N’ajoutez pas un affichage de ce `n` après la boucle en supposant qu’il y soit encore accessible.

## Bornes et terminaison

La différence entre `< 4` et `<= 4` est observable. Dans le programme guidé, `< 4` parcourt `1`, `2` et `3`, laissant un total final de `4`. `<= 4` parcourt aussi `4` et donne `8`. Aucun opérateur n’est correct par défaut ; choisissez celui qui inclut exactement les valeurs prévues.

Ici, la terminaison découle d’un petit compteur borné : il commence à `1`, augmente de `1` et finit par échouer au test à `5`. Ces valeurs tiennent dans `int`. « Le compteur augmente » ne prouve pas la terminaison de n’importe quelle boucle entière : près de la limite du type, le dépassement étudié dans l’unité précédente peut intervenir.

Un point-virgule juste après l’en-tête, comme dans `while (condition);`, crée un corps de boucle vide. L’indentation n’y rattache pas les instructions suivantes. Gardez les accolades et suivez les instructions réelles, pas leur alignement visuel.

## Exercice : tracer une boucle while

Enregistrez le programme suivant sous le nom `ControlFlowExercise.java`. Prévoyez les deux lignes affichées et expliquez chaque passage par la condition.

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

Compilez avec `javac -d out ControlFlowExercise.java`, puis lancez `java -cp out ControlFlowExercise`.

1. Pourquoi le compteur final est-il supérieur au dernier compteur utilisé par le corps ?
2. Si la condition devient `n <= 4`, quelles sont les deux sorties ?
3. Rétablissez `n < 4`, mais commencez avec `n = 4`. Que se passe-t-il ?
4. Si la mise à jour `n = n + 1;` est retirée du programme original, la condition peut-elle devenir fausse ? Raisonnez sur cette variante ; ne lancez pas volontairement un programme qui ne termine pas.

## Réponse et raisonnement

```text
4
14
```

Dans le programme original, le corps voit `n = 1`, puis `2`, puis `3`. Le total passe de `0` à `1`, puis à `11`, puis à `14`. La mise à jour après le troisième corps donne `n = 4` ; le test suivant échoue. Le compteur final vaut donc `4`, même si le corps a vu `3` lors de son dernier passage.

Avec `n <= 4`, une itération supplémentaire ajoute `4`. Le compteur final vaut `5` et le total vaut `18`.

Commencer à `n = 4` avec `n < 4` rend le premier test faux. Le corps est exécuté zéro fois ; les sorties sont `4` et `0`.

Sans mise à jour, `n` reste à `1`. Ajouter à `total` ne change pas `n`, donc `n < 4` reste vrai. Même si `total` finit par déborder, cette condition ne dépend que de `n`, qui ne change pas. Cette variante ne termine pas normalement.

## Vérifiez votre compréhension

Pour chaque boucle, identifiez l’état initial, le test, la branche choisie, la mise à jour et l’état de sortie. Incluez le dernier test faux dans votre trace. Pouvez-vous prévoir zéro, une et plusieurs itérations avant d’exécuter le programme ?

Les exemples originaux suivent les règles de Java 25 pour [if/else](https://docs.oracle.com/javase/specs/jls/se25/html/jls-14.html#jls-14.9), [while](https://docs.oracle.com/javase/specs/jls/se25/html/jls-14.html#jls-14.12) et [for de base](https://docs.oracle.com/javase/specs/jls/se25/html/jls-14.html#jls-14.14.1). Les instructions switch, les streams et le contrôle avancé des boucles ne font pas partie de cette unité.
