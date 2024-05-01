/**
 * Created by joshwolfman on 5/6/19.
 */
function main(){
    setInterval(update,100);
}
function update(){
    var PL=parseFloat(document.getElementById("PL").value);
    var number=parseFloat(document.getElementById("size").value);
    var CR=[0,0];
    /*
     NPC's Challenge Rank: NPC's Power Level
     Challenge Rank 1: Party's PL -4 or lower
     Challenge Rank 2: Party's PL -2 or -3
     Challenge Rank 3: Party's PL -1
     Challenge Rank 4: Party's PL
     Challenge Rank 5-6: Party's PL + 1
     Challenge Rank 7-9: Party's PL + 2
     Challenge Rank 10-13: Party's PL + 3
     Challenge Rank 14-19: Party's PL + 4
     Challenge Rank 20+: Party's PL + 5
     */
    if(document.getElementsByClassName("NPC").length>0) {
        for (var c=0;c<document.getElementsByClassName("NPC").length;c++) {
            var NPC=document.getElementsByClassName("NPC")[c];
            //enemy PL
            var ePL = parseFloat(NPC.childNodes[3].value);
            if(NPC.childNodes[7].checked){//check rapid-fire
                ePL+=2;
            }
            if(NPC.childNodes[8].value==2){//check ally
                CR[0]*=-1;
                CR[1]*=-1;
            }else if(NPC.childNodes[8].value==1){//check neutral
                CR[0]*=2;
                CR[1]*=2;
            }
            for(var i=0;i<NPC.childNodes[5].value;i++) {
                if (ePL == PL - 4) {
                    CR[0] += 1;
                    CR[1] += 1;
                } else if (ePL == PL - 2||ePL==PL-3) {
                    CR[0] += 2;
                    CR[1] += 2;
                } else if (ePL == PL - 1) {
                    CR[0] += 3;
                    CR[1] += 3;
                } else if (ePL == PL) {
                    CR[0] += 4;
                    CR[1] += 4;
                } else if (ePL == PL + 1) {
                    CR[0] += 5;
                    CR[1] += 6;
                } else if (ePL == PL + 2) {
                    CR[0] += 7;
                    CR[1] += 9;
                } else if (ePL == PL + 3) {
                    CR[0] += 10;
                    CR[1] += 13;
                } else if (ePL == PL + 4) {
                    CR[0] += 14;
                    CR[1] += 19;
                } else{
                    CR[0]+=3.92925*Math.E**(0.31336*(ePL-PL));
                    if(ePL<PL-4){
                        CR[1]+=3.92925*Math.E**(0.31336*(ePL-PL));
                    }else {
                        CR[1] += 4.32305 * Math.E ** (0.368479 * (ePL - PL));
                    }
                    //CR[0]+=Math.ceil(-0.00105445*Math.pow(ePL-PL,4) + 0.0426079*Math.pow(ePL-PL,3) +
                    // 0.246156*Math.pow(ePL-PL,2) + 0.943992*(ePL-PL) + 3.84095);
                    //CR[1]+=Math.ceil(-0.00261384*Math.pow(ePL-PL,4) + 0.0534417*Math.pow(ePL-PL,3) +
                    // 0.411304*Math.pow(ePL-PL,2) + 1.38506*(ePL-PL) + 4.07624);
                    //CR[0] += Math.ceil(3.85056*Math.E**(.319568*(ePL-PL)));
                    //CR[1] += Math.ceil(4.24811*Math.E**(.373671*(ePL-PL)));
                }
            }
            if(NPC.childNodes[8].value==2){//check ally
                CR[0]*=-1;
                CR[1]*=-1;
            }else if(NPC.childNodes[8].value==1){//check neutral
                CR[0]/=2;
                CR[1]/=2;
            }
        }
    }
    /*
     Party PL-8= 16 minions for 1 challenge rank
     Party PL-7= 12 minions for 1 challenge rank
     Party PL-6= 8 minions for 1 challenge rank
     Party PL-5= 6 minions for 1 challenge Rank
     Party PL-4= 4 minions for 1 challenge rank
     Party PL-3= 3 minions for 1 challenge rank
     Party PL-2= 2 minions for 1 challenge rank
     Party PL-1 to Party PL= 1 minion for 1 challenge rank
     */
    if(document.getElementsByClassName("minion").length) {
        for (var c=0;c<document.getElementsByClassName("minion").length;c++) {
            var minion=document.getElementsByClassName("minion")[c];
            var ePL = parseFloat(minion.childNodes[3].value);
            //effective number of minions = number of minions*minion tier
            var num=parseFloat(minion.childNodes[5].value)*(parseFloat(minion.childNodes[7].value)+1);
            if(minion.childNodes[8].value==2){//check ally
                CR[0]*=-1;
                CR[1]*=-1;
            }else if(minion.childNodes[8].value==1){//check neutral
                CR[0]*=2;
                CR[1]*=2;
            }
            if(ePL==PL-8){
                CR[0]+=num/16;
                CR[1]+=num/16;
            }else if(ePL==PL-7){
                CR[0]+=num/12;
                CR[1]+=num/12;
            }else if(ePL==PL-6){
                CR[0]+=num/8;
                CR[1]+=num/8;
            }else if(ePL==PL-5){
                CR[0]+=num/6;
                CR[1]+=num/6;
            }else if(ePL==PL-4){
                CR[0]+=num/4;
                CR[1]+=num/4;
            }else if(ePL==PL-3){
                CR[0]+=num/3;
                CR[1]+=num/3;
            }else if(ePL==PL-2){
                CR[0]+=num/2;
                CR[1]+=num/2;
            }else if(ePL==PL){
                CR[0]+=num;
                CR[1]+=num;
            }else{
                CR[0]+=num/(1.03683*Math.E**(-.344073*(ePL-PL)));
                CR[1]+=num/(1.03683*Math.E**(-.344073*(ePL-PL)));
            }
            if(minion.childNodes[8].value==2){//check ally
                CR[0]*=-1;
                CR[1]*=-1;
            }else if(minion.childNodes[8].value==1){//check neutral
                CR[0]/=2;
                CR[1]/=2;
            }
        }
    }
    //forces
    if(document.getElementsByClassName("force").length) {
        for (var c=0;c<document.getElementsByClassName("force").length;c++) {
            var force=document.getElementsByClassName("force")[c];
            //quality PL
            var qPL=parseInt(force.childNodes[2].value)+3;
            var size=parseInt(force.childNodes[4].value);
            var ePL=qPL+size-1;
            var num=parseInt(force.childNodes[6].value);
            if(force.childNodes[7].value==2){//check ally
                CR[0]*=-1;
                CR[1]*=-1;
            }else if(force.childNodes[7].value==1){//check neutral
                CR[0]*=2;
                CR[1]*=2;
            }
            for(var i=0;i<num;i++) {
                if (ePL == PL - 4) {
                    CR[0] += 1;
                    CR[1] += 1;
                } else if (ePL == PL - 2|| ePL==PL-3) {
                    CR[0] += 2;
                    CR[1] += 2;
                } else if (ePL == PL - 1) {
                    CR[0] += 3;
                    CR[1] += 3;
                } else if (ePL == PL) {
                    CR[0] += 4;
                    CR[1] += 4;
                } else if (ePL == PL + 1) {
                    CR[0] += 5;
                    CR[1] += 6;
                } else if (ePL == PL + 2) {
                    CR[0] += 7;
                    CR[1] += 9;
                } else if (ePL == PL + 3) {
                    CR[0] += 10;
                    CR[1] += 13;
                } else if (ePL == PL + 4) {
                    CR[0] += 14;
                    CR[1] += 19;
                } else{
                    CR[0] += 3.85056*Math.E**(.319568*(ePL-PL));
                    CR[1] += 4.24811*Math.E**(.373671*(ePL-PL));
                }
            }
            if(force.childNodes[7].value==2){//check ally
                CR[0]*=-1;
                CR[1]*=-1;
            }else if(force.childNodes[7].value==1){//check neutral
                CR[0]/=2;
                CR[1]/=2;
            }
        }
    }
    //challenges
    if(document.getElementsByClassName("challenge").length){
        for(var c=0;c<document.getElementsByClassName("challenge").length;c++){
            var challenge=document.getElementsByClassName("challenge")[c];
            var DC=challenge.childNodes
            //check and toggle timed
            if(challenge.childNodes[13].checked){//enable and calculate
                challenge.childNodes[15].disabled=false;
            }else{//disable if unchecked
                challenge.childNodes[15].disabled=true;
            }
            //check and toggle penalties
            if(challenge.childNodes[17].checked){//enable and calculate
                challenge.childNodes[19].disabled=false;
            }else{//disable if unchecked
                challenge.childNodes[19].disabled=true;
            }
        }
    }
    //round CR
    CR[0]=Math.round(CR[0]);
    CR[1]=Math.round(CR[1]);
    //calculate and display DR
    var p= document.createElement("P");
    var diff=document.createElement("P");
    if(CR[0]==CR[1]){
        p.innerHTML=CR[0];
        diff.innerHTML=calc(CR[0],number);
    }else{
        p.innerHTML=CR[0]+"-"+CR[1];
        diff.innerHTML=calc(CR[0],number)+"-"+calc(CR[1],number);
    }
    while(document.getElementById("CR").childElementCount>1) {
        document.getElementById("CR").removeChild(document.getElementById("CR").childNodes[2]);
    }
    document.getElementById("CR").appendChild(p);
    while(document.getElementById("diff").childElementCount>1){
        document.getElementById("diff").removeChild(document.getElementById("diff").childNodes[2]);
    }
    document.getElementById("diff").appendChild(diff);
}
function add(type){
    var NPC=document.createElement("DIV");
    NPC.className=type;
    var name=document.createElement("P");
    name.innerHTML="Name:";
    NPC.appendChild(name);
    var nameBox=document.createElement("INPUT");
    nameBox.type="text";
    NPC.appendChild(nameBox);
    if(type!="force") {
        var PL=document.createElement("P");
        PL.innerHTML=" PL:";
        NPC.appendChild(PL);
        var PLBox=document.createElement("INPUT");
        PLBox.type="number";
        PLBox.className="PL";
        PLBox.min=1;
        PLBox.value=1;
        PLBox.onchange=update();
        NPC.appendChild(PLBox);
        var number=document.createElement("P");
        number.innerHTML=" Number:";
        NPC.appendChild(number);
        var numberBox=document.createElement("INPUT");
        numberBox.type="number";
        numberBox.className="number";
        numberBox.min=1;
        numberBox.value=1;
        numberBox.onchange=update();
        NPC.appendChild(numberBox);
        if (type == "NPC") {
            var rapid=document.createElement("P");
            rapid.innerHTML=" Rapid-Fire:";
            NPC.appendChild(rapid);
            var rapidBox=document.createElement("INPUT");
            rapidBox.type="checkbox";
            rapidBox.className="rapid";
            rapidBox.onchange=update();
            NPC.appendChild(rapidBox);
        } else {
            var tier=document.createElement("P");
            tier.innerHTML="Tier:";
            NPC.appendChild(tier);
            var tierBox=document.createElement("SELECT");
            tierBox.onchange=update();
            var tierBruise=document.createElement("OPTION");
            tierBruise.value=0;
            tierBruise.innerHTML="Bruise";
            tierBox.appendChild(tierBruise);
            var tierDaze=document.createElement("OPTION");
            tierDaze.value=1;
            tierDaze.innerHTML="Daze";
            tierBox.appendChild(tierDaze);
            var tierStag=document.createElement("OPTION");
            tierStag.value=2;
            tierStag.innerHTML="Stagger";
            tierBox.appendChild(tierStag);
            NPC.appendChild(tierBox);
        }
    }else{
        /*var quality=document.createElement("P");
        quality.innerHTML="Quality:";
        NPC.appendChild(quality);*/
        var qBox=document.createElement("SELECT");
        qBox.onchange=update();
        var green=document.createElement("OPTION");
        green.value=0;
        green.innerHTML="Green";
        qBox.appendChild(green);
        var trained=document.createElement("OPTION");
        trained.value=1;
        trained.innerHTML="Trained";
        qBox.appendChild(trained);
        var veteran=document.createElement("OPTION");
        veteran.value=2;
        veteran.innerHTML="Veteran";
        qBox.appendChild(veteran);
        NPC.appendChild(qBox);
        var size=document.createElement("P");
        size.innerHTML="Size:";
        NPC.appendChild(size);
        var sizeBox=document.createElement("INPUT");
        sizeBox.type="number";
        sizeBox.className="number";
        sizeBox.min=1;
        sizeBox.value=1;
        sizeBox.onchange=update();
        NPC.appendChild(sizeBox);
        var number=document.createElement("P");
        number.innerHTML=" Number:";
        NPC.appendChild(number);
        var numberBox=document.createElement("INPUT");
        numberBox.type="number";
        numberBox.className="number";
        numberBox.min=1;
        numberBox.value=1;
        numberBox.onchange=update();
        NPC.appendChild(numberBox);
    }
    var alignment=document.createElement("SELECT");
    alignment.onchange=update();
    var enemy=document.createElement("OPTION");
    enemy.value=0;
    enemy.innerHTML="Enemy";
    alignment.appendChild(enemy);
    var neutral=document.createElement("OPTION");
    neutral.value=1;
    neutral.innerHTML="Neutral";
    alignment.appendChild(neutral);
    var ally=document.createElement("OPTION");
    ally.value=2;
    ally.innerHTML="Ally";
    alignment.appendChild(ally);
    NPC.appendChild(alignment)
    var remove=document.createElement("BUTTON");
    remove.innerHTML="Remove";
    NPC.appendChild(remove);
    document.getElementById(type).appendChild(NPC);
    remove.setAttribute("onclick","this.parentElement.parentElement.removeChild(this.parentElement)");
}
function addChallenge(){
    var challenge=document.createElement("DIV");
    challenge.className="challenge";
    //name
    var name=document.createElement("P");
    name.innerHTML="Name:";
    challenge.appendChild(name);
    var nameBox=document.createElement("INPUT");
    nameBox.type="text";
    challenge.appendChild(nameBox);
    //DC
    var DC=document.createElement("P");
    DC.innerHTML=" DC:";
    challenge.appendChild(DC);
    var DCBox=document.createElement("INPUT");
    DCBox.type="number";
    DCBox.className="DC";
    DCBox.min=1;
    DCBox.value=10;
    DCBox.onchange=update();
    challenge.appendChild(DCBox);
    //successes
    var successes=document.createElement("P");
    successes.innerHTML="Successes/Degrees:";
    challenge.appendChild(successes);
    var successBox=document.createElement("INPUT");
    successBox.type="number";
    successBox.className="success";
    successBox.min=1;
    successBox.value=5;
    successBox.onchange=update();
    challenge.appendChild(successBox);
    //binary success/fail
    var binary=document.createElement("P");
    binary.innerHTML="Pass/fail:";
    challenge.appendChild(binary);
    var binaryBox=document.createElement("INPUT");
    binaryBox.type="checkbox";
    binaryBox.className="binary";
    binaryBox.onchange=update();
    challenge.appendChild(binaryBox);
    //failures
    var failures=document.createElement("P");
    failures.innerHTML="Degrees of failure:";
    challenge.appendChild(failures);
    var failureBox=document.createElement("INPUT");
    failureBox.type="number";
    failureBox.className="failure";
    failureBox.min=1;
    failureBox.value=3;
    failureBox.onchange=update();
    challenge.appendChild(failureBox);
    //cumulative failure
    var cumulative=document.createElement("P");
    cumulative.innerHTML="Cumulative:";
    challenge.appendChild(cumulative);
    var cumulativeBox=document.createElement("INPUT");
    cumulativeBox.type="checkbox";
    cumulativeBox.className="cumulative";
    cumulativeBox.onchange=update();
    challenge.appendChild(cumulativeBox);
    //time limit
    var timed=document.createElement("P");
    timed.innerHTML="Timed:";
    challenge.appendChild(timed);
    var timedBox=document.createElement("INPUT");
    timedBox.type="checkbox";
    timedBox.className="timed";
    timedBox.onchange=update();
    challenge.appendChild(timedBox);
    var time=document.createElement("P");
    time.innerHTML="Rounds/attempts:";
    challenge.appendChild(time);
    var timeBox=document.createElement("INPUT");
    timeBox.type="number";
    timeBox.className="time";
    timeBox.min=1;
    timeBox.value=5;
    timeBox.disabled=true;
    timeBox.onchange=update();
    challenge.appendChild(timeBox);
    //consequences and PL
    var penalties=document.createElement("P");
    penalties.innerHTML="Penalties:";
    challenge.appendChild(penalties);
    var penaltiesBox=document.createElement("INPUT");
    penaltiesBox.type="checkbox";
    penaltiesBox.className="penalties";
    penaltiesBox.onchange=update();
    challenge.appendChild(penaltiesBox);
    var penalty=document.createElement("P");
    penalty.innerHTML="PL:";
    challenge.appendChild(penalty);
    var penaltyBox=document.createElement("INPUT");
    penaltyBox.type="number";
    penaltyBox.className="PL";
    penaltyBox.min=1;
    penaltyBox.value=5;
    penaltyBox.disabled=true;
    penaltyBox.onchange=update();
    challenge.appendChild(penaltyBox);
    //remove
    var remove=document.createElement("BUTTON");
    remove.innerHTML="Remove";
    challenge.appendChild(remove);
    document.getElementById("challenge").appendChild(challenge);
    remove.setAttribute("onclick","this.parentElement.parentElement.removeChild(this.parentElement)");
}
function toggleTutorial(evt, target){
    if(target.childElementCount>0){
        if(evt.target.tagName!="BUTTON") {
            target.removeChild(target.childNodes[1]);
            target.text = "How to use this calculator";
        }
    }else{
        var d=document.createElement("div");
        d.id="popup";
        var tabs=document.createElement("div");
        tabs.className="tab";
        tabs.id="rulesTabs";
        var combat=document.createElement("button");
        combat.className="tabLinks rules";
        combat.onclick=function(){openTab(event, 'combatRules', 'rules')};
        combat.innerHTML="Combat";
        tabs.appendChild(combat);
        var challenges=document.createElement("button");
        challenges.className="tabLinks rules";
        challenges.onclick=function(){openTab(event, 'challengeRules', 'rules')};
        challenges.innerHTML="Challenges";
        tabs.appendChild(challenges);
        d.appendChild(tabs);
        var combatRules=document.createElement("div");
        combatRules.id="combatRules";
        combatRules.className="tabContent rules";
        var combatText=document.createElement("p");
        //p.className="popup";
        combatText.innerHTML="First set the PL of the party and the number of players then use the buttons to add or" +
            " remove" +
            " NPCs and minions and set their numbers and PLs. The calculator will calculate the CR and show the" +
            " danger ranking of the encounter, the danger ranking being more important to play than the challenge" +
            " ranking.<br><br>"+
            "This calculator deviates from the danger ranking scale set out in the original formula. We have found" +
            " that it doesn't actually hold up well to play with characters who have defenses and offenses at cap" +
            " for PL, and that it is very common for new players and GMs to make the mistake of not capping those on" +
            " PCs. We can only assume that the ranking system was made for such groups. That being said, we do" +
            " include the original scale in brackets following the numerical danger ranking. Furthermore, we have" +
            " explanations based on how we've found the rankings to translate in play, as well as extending the" +
            " formula in both directions for NPCs and minions.<br><br>"+
            "No Danger: There is no possible way that the PCs could be seriously threatened.<br>"+
            "Minimal Danger: The PCs have almost no chance of being defeated.<br>"+
            "Modest Danger: The PCs stand to suffer some injuries if they're not careful.<br>"+
            "Significant Danger: The PCs are likely to win the fight, but it will require smart play to come out on" +
            " top.<br>"+
            "Serious Danger: The PCs are going up against a real threat and could just as easily win as they could" +
            " lose, and will need to play smart to win.<br>"+
            "Severe Danger: The PCs are going to be outmatched, and without very clever gameplay and teamwork," +
            " they're more likely than not going to lose.<br>"+
            "Overwhelming Danger: The PCs are very likely to lose the encounter, and only tremendous luck or playing" +
            " at the top of their game can see them through.<br><br>"+
            "If you're using forces then you'll want to keep the following table in mind for the conversion of size" +
            " to number of people.";
        combatRules.appendChild(combatText);
        var combatTable=document.createElement("table");
        combatTable.innerHTML="<tr><th>UNIT TYPE</th><th>APPROX. NO. OF TROOPS</th><th>FORCE RANK</th></tr>"+
            "<tr><td>Corps</td><td>20,000–50,000</td><td>14</td></tr>" +
            "<tr><td>Division</td><td>9,000–15,000</td><td>13</td></tr>" +
            "<tr><td>Brigade</td><td>6,000–8,000</td><td>12</td></tr>" +
            "<tr><td>Regiment</td><td>3,000–4,000</td><td>11</td></tr>" +
            "<tr><td>Battalion</td><td>500–1,000</td><td>9</td></tr>" +
            "<tr><td>Company</td><td>140</td><td>7</td></tr>" +
            "<tr><td>Platoon</td><td>30–50</td><td>5</td></tr>" +
            "<tr><td>Squad</td><td>10</td><td>3</td></tr>";
        combatRules.appendChild(combatTable);
        d.appendChild(combatRules);
        var challengeRules=document.createElement("div");
        challengeRules.id="challengeRules";
        challengeRules.className="tabContent rules";
        var challengeText=document.createElement("p");
        challengeText.innerHTML="This section is still under construction and will not impact end results yet.<br><br>"+
            "Needed successes are based around number of PCs times 1.5. DCs are based on an assumption of a +0-+5" +
            " bonus."
        challengeRules.appendChild(challengeText);
        d.appendChild(challengeRules);
        target.appendChild(d);
        combat.click();
    }
}
function calc(CR,num){
    var DR=Math.floor(CR/num);
    switch(DR){
        case 0:
        case 1:
        case 2:
            return " No Danger ("+DR+")";
        case 3:
            return " Minimal Danger ("+DR+")";
        case 4:
            return " Modest Danger ("+DR+")";
        case 5:
            return " Significant Danger ("+DR+")";
        case 6:
            return " Serious Danger ("+DR+")";
        case 7:
            return " Severe Danger ("+DR+")";
        case 8:
            return " Overwhelming Danger ("+DR+")";
        default:
            return " Exceeds danger ranks ("+DR+")";
    }
}
function openTab(evt, tabName, section) {
    // Declare all variables
    var i, tabContent, tabLinks;

    // Get all elements with class="tabcontent" and hide the ones in the section
    tabContent = document.getElementsByClassName("tabContent");
    for (i = 0; i < tabContent.length; i++) {
        if (tabContent[i].className.includes(section)) {
            tabContent[i].style.display = "none";
        }
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tabLinks = document.getElementsByClassName("tabLinks");
    for (i = 0; i < tabLinks.length; i++) {
        if (tabLinks[i].className.includes(section)) {
            tabLinks[i].className = tabLinks[i].className.replace(" active", "");
        }
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    var disp="flex";
    if(section=="rules")
        disp="inline-block"
    document.getElementById(tabName).style.display = disp;
    evt.currentTarget.className += " active";
}