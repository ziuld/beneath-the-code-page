## Ce que vous allez apprendre

Le type déclaré d’une variable limite ses valeurs possibles et contribue à déterminer comment une expression est évaluée. Une destination plus large n’élargit pas un calcul déjà effectué. Dans cette unité, vous allez prévoir un dépassement de capacité des entiers, expliquer la division entière et reconnaître pourquoi certains calculs décimaux sont approximatifs.

Lisez d’abord l’unité sur le passage du code source à la JVM. Vous pouvez lire cette leçon sans rien installer. Pour reproduire les exemples, utilisez le JDK 25 et la démarche de compilation et d’exécution de la première unité. Le site n’exécute pas votre code et ne le reçoit pas.

## Le type fait partie du calcul

Dans `int count = 7;`, `int` est le type déclaré, `count` le nom de la variable et `7` sa valeur initiale. Une affectation comme `count = 9;` remplace la valeur de cette variable ; elle ne change pas son type. Une variable locale doit recevoir une valeur avant d’être lue.

Java possède huit types primitifs :

- `byte` : entiers de −128 à 127 ; `short` : de −32768 à 32767.
- `int` : entiers de −2147483648 à 2147483647.
- `long` : entiers de −9223372036854775808 à 9223372036854775807. Le suffixe `L` fait d’un littéral entier un littéral de type `long`, par exemple `3_000_000_000L`.
- `char` : une unité de code UTF-16 non signée, de 0 à 65535. Elle ne représente pas toujours un caractère Unicode complet ; certains caractères nécessitent deux unités de code.
- `float` et `double` : valeurs en virgule flottante binaire, avec environ 7 et 15–16 chiffres décimaux significatifs respectivement. Ce sont des indications de précision, pas la garantie que tout nombre décimal est représenté exactement. Ils admettent aussi les infinis et NaN, une valeur spéciale signifiant « pas un nombre ». Un littéral décimal comme `2.0` est de type `double` ; `2.0f` est de type `float`.
- `boolean` : `true` ou `false`, pas les valeurs numériques 0 et 1.

Les tirets bas dans les littéraux numériques, comme dans `2_000`, facilitent la lecture sans changer la valeur. Les opérations arithmétiques sur `byte`, `short` et `char` les promeuvent généralement en `int`. Pour l’addition entière étudiée ici, deux opérandes `int` donnent un résultat `int` ; un opérande `long` fait de l’addition un calcul de type `long`.

```text
expression int -- évaluer en int --> résultat int -- affecter --> variable long
                  dépassement possible           élargissement trop tardif

opérande long + opérande int -- évaluer en long --> résultat long
```

Ce schéma décrit l’évaluation et l’affectation, pas la disposition physique de la mémoire. `long` a aussi ses limites ; élargir n’aide que si le résultat tient dans le type choisi.

## Exemple guidé : prévoir avant d’exécuter

Enregistrez le programme suivant sous le nom `NumericValues.java`. Prévoyez ses sept lignes de sortie avant de compiler.

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

Compilez et exécutez depuis le même répertoire :

```sh
javac -d out NumericValues.java
java -cp out NumericValues
```

La sortie est :

```text
-2147483648
2147483648
-2147483648
2
2.5
0.30000000000000004
7 9
```

Voici l’explication de chaque résultat :

1. `largest + 1` est évalué en `int`. L’addition entière ordinaire reboucle lors d’un dépassement de capacité ; le résultat est la valeur minimale de `int`, pas une exception.
2. `(long) largest + 1` élargit un opérande avant l’addition. Ce résultat tient dans un `long`.
3. `(long) (largest + 1)` effectue d’abord l’addition `int` qui déborde. La conversion conserve ensuite cette valeur négative, déjà contraire à votre intention ; elle ne retrouve pas le résultat perdu.
4. `5 / 2` utilise la division entière, qui supprime la partie fractionnaire en tronquant vers zéro. Le résultat est `2`.
5. `5 / 2.0` utilise la division en virgule flottante puisque `2.0` est un `double` ; ce résultat vaut `2.5`.
6. Les valeurs binaires `double` utilisées pour `0.1` et `0.2` sont des approximations. Leur addition produit la valeur affichée `0.30000000000000004`. Afficher un nombre décimal court ne prouve pas que la valeur stockée est exacte. Les calculs monétaires décimaux exacts demandent de choisir une représentation décimale, sans supposer que `double` convient systématiquement.
7. `copy = original` copie la valeur primitive `7`. Affecter `9` à `copy` laisse `original` inchangée.

## Valeurs primitives et valeurs de référence

`String` n’est pas un neuvième type primitif. Une variable de type référence contient une référence vers un objet, ou `null`, qui ne désigne aucun objet. Affecter une variable de référence à une autre copie la valeur de la référence ; cela ne copie pas l’objet. Les deux variables peuvent alors désigner le même objet. Copier une valeur primitive ne crée pas cet état partagé d’un objet.

```text
affectation primitive : original [7]    copy [7]  (valeurs indépendantes)
affectation de référence : first -----> objet
                          second ----> le même objet
```

Il s’agit d’une distinction conceptuelle, pas d’une règle imposant une zone mémoire aux primitifs et une autre aux références. La modification des objets et les arguments de méthodes appartiennent à des unités ultérieures ; ici, nous distinguons seulement ce qu’une affectation copie.

## Exercice : la destination corrige-t-elle le calcul ?

Prévoyez les trois lignes affichées par ce programme. Expliquez quelle opération précède chaque affectation. Enregistrez-le sous le nom `NumericExercise.java`.

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

Compilez avec `javac -d out NumericExercise.java`, puis lancez `java -cp out NumericExercise`. Quels deux changements dans les expressions donneraient `4000000000` pour le premier résultat et `2.5` pour le dernier ?

## Réponse et raisonnement

```text
-294967296
4000000000
2.0
```

`tickets + tickets` additionne deux valeurs `int`. Leur somme mathématique, 4000000000, dépasse l’intervalle de `int` : l’addition déborde et donne −294967296. Affecter ce résultat à `long tooLate` n’annule pas le dépassement. Élargissez un opérande avant l’addition, comme dans `(long) tickets + tickets` ; la deuxième ligne montre déjà cette correction.

`5 / 2` produit l’entier `2` avant l’affectation. Son élargissement en `double` donne `2.0`. Utilisez `5 / 2.0` pour effectuer une division en virgule flottante et obtenir `2.5`.

## Vérifiez votre compréhension

Avant de vous fier à un résultat, identifiez les types des opérandes, le type de l’expression, son intervalle représentable et le moment des conversions. Pouvez-vous expliquer pourquoi changer seulement le type de destination ne corrige aucune des deux erreurs de l’exercice ?

Consultez la spécification Java 25 sur les [types et valeurs](https://docs.oracle.com/javase/specs/jls/se25/html/jls-4.html), la [division entière](https://docs.oracle.com/javase/specs/jls/se25/html/jls-15.html#jls-15.17.2) et l’[addition numérique](https://docs.oracle.com/javase/specs/jls/se25/html/jls-15.html#jls-15.18.2) pour les règles précises. Les exemples et explications sont du matériel pédagogique original, pas du texte copié de la spécification.
