// coding challange 3
/*

There are two gymnastics teams, Dolphins and Koalas. They compete against each
other 3 times. The winner with the highest average score wins a trophy!
Your tasks:
1. Calculate the average score for each team, using the test data below
2. Compare the team's average scores to determine the winner of the competition,
and print it to the console. Don't forget that there can be a draw, so test for that
as well (draw means they have the same average score)
3. Bonus 1: Include a requirement for a minimum score of 100. With this rule, a
team only wins if it has a higher score than the other team, and the same time a
score of at least 100 points. Hint: Use a logical operator to test for minimum
score, as well as multiple else-if blocks �
4. Bonus 2: Minimum score also applies to a draw! So a draw only happens when
both teams have the same score and both have a score greater or equal 100
points. Otherwise, no team wins the trophy
Test data:
§ Data 1: Dolphins score 96, 108 and 89. Koalas score 88, 91 and 110
§ Data Bonus 1: Dolphins score 97, 112 and 101. Koalas score 109, 95 and 123
§ Data Bonus 2: Dolphins score 97, 112 and 101. Koalas score 109, 95 and 106
GOOD LUCK �

*/
// const KoalasFirstScore = 97;
// const KoalasSecondScore = 112;
// const KoalasThirdScore = 101;

// const DolphinsFirstScore = 109;
// const DolphinsSecondScore = 95;
// const DolphinsThirdScore = 106;

// const KoalasAvgScore = (KoalasFirstScore + KoalasSecondScore + KoalasThirdScore)/3;
// const DolphinsAvgScore = (DolphinsFirstScore + DolphinsSecondScore + DolphinsThirdScore)/3;

// console.log(KoalasAvgScore, DolphinsAvgScore);

// if(KoalasAvgScore > DolphinsAvgScore && KoalasAvgScore >= 100){
//     console.log("Koalas won!");
// }
// else if(KoalasAvgScore === DolphinsAvgScore && KoalasAvgScore >= 100){
//     console.log("Draw!");
// }
// else if(DolphinsAvgScore >= 100){
//     console.log("Dolphins won!");
// }
// else{
//     console.log("Minimum score is 100 points!");
// }


/*
Steven wants to build a very simple tip calculator for whenever he goes eating in a
restaurant. In his country, it's usual to tip 15% if the bill value is between 50 and
300. If the value is different, the tip is 20%.
Your tasks:
1. Calculate the tip, depending on the bill value. Create a variable called 'tip' for
this. It's not allowed to use an if/else statement � (If it's easier for you, you can
start with an if/else statement, and then try to convert it to a ternary
operator!)
2. Print a string to the console containing the bill value, the tip, and the final value
(bill + tip). Example: “The bill was 275, the tip was 41.25, and the total value
316.25”
Test data:
§ Data 1: Test for bill values 275, 40 and 430
*/

const billValue = 430;
const tipValue = billValue >= 50 && billValue <= 300? billValue * 0.15 : billValue * 0.2;

console.log(`“The bill was ${billValue}, the tip was ${tipValue}, and the total value ${billValue + tipValue}`);