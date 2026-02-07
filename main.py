import subprocess


playedGame = "nv"
karmaBool : bool = False
skillsBool : bool = False
specialBool : bool = False
challengesBool : bool = False
challengeQty = 0
output = "console"

def setGame(game): 
    playedGame = game;
    pass

def setKarma():
    karmaBool = True
    pass

def setSkills():
    skillsBool = True
    pass

def setChallenge():
    challengesBool = True
    pass

def startUp():
    gameDone = False
    karmaDone = False
    skillsDone = False
    specialDone = False
    challengesDone = False
    challengesQty = True
    htmlCheck = False

    playedGame = "nv"
    while (gameDone == False):
        gameInput = input("Which game are you playing?\n1. Fallout 3\n2. Fallout: New Vegas\n")
        match (gameInput.lower()):
            case ("1"):
                gameDone = True
                playedGame = "3"
                print("Fallout 3 selected.")
                print("")
            case ("2"):
                gameDone = True
                playedGame = "nv"
                print("Fallout New Vegas selected.")
                print("")
            case _:
                print("Error parsing, please enter 1 or 2.")
                print("")
            
    setGame(gameInput)

    while (specialDone == False):
        specialInput = input("Would you like to randomize SPECIAL stats?\n1. Yes\n2. No\n")
        match (specialInput.lower()):
            case ("1"):
                specialDone = True
                specialBool = True
                print("Well that was lucky!... or not?\n")
            case ("2"):
                specialDone = True
                specialBool = False
                print("Letting you choose your own path.\n")
            case _:
                print("Error parsing, please enter 1 or 2.\n")
                
    while (karmaDone == False):
        karmaCheck = input("Would you like to randomize karma?\n1. Yes\n2. No\n")
        match (karmaCheck.lower()):
            case ("1"):
                karmaDone = True
                karmaBool = True
                print("I wonder how you'll treat people?")
                print("")
            case ("yes"):
                karmaDone = True
                karmaBool = True
                print("I wonder how you'll treat people?")
                print("")
            case ("2"):
                karmaDone = True
                karmaBool = False
                print("Letting you choose your own path.")
                print("")
            case ("no"):
                karmaDone = True
                karmaBool = False
                print("Letting you choose your own path.")
                print("")
            case _:
                print("Error parsing, please enter 1 or 2.")
                print("")
    
    while (skillsDone == False):
        skillsCheck = input("Would you like to randomize skills?\n1. Yes\n2. No\n")
        match (skillsCheck.lower()):
            case ("1"):
                skillsDone = True
                skillsBool = True
                print("Who knows what you'll learn?")
                print("")
                setSkills()
            case ("yes"):
                skillsDone = True
                skillsBool = True
                print("Who knows what you'll learn?")
                print("")
                setSkills()
            case ("2"):
                skillsDone = True
                skillsBool = False
                print("Letting you choose your own path.")
                print("")
            case ("no"):
                skillsDone = True
                skillsBool = False
                print("Letting you choose your own path.")
                print("")
            case _:
                print("Error parsing, please enter 1 or 2.")
                print("")

    while (challengesDone == False):
        challengesCheck = input("Would you like to add a random challenge?\n1. Yes\n2. No\n")
        match (challengesCheck.lower()):
            case ("1"):
                challengesDone = True
                challengesBool = True
                challengesQty = False
                print("Ooh, a challenge has been accepted!")
                print("")
                setChallenge()
            case ("yes"):
                challengesDone = True
                challengesBool = True
                challengesQty = False
                print("Ooh, a challenge has been accepted!")
                print("")
                setChallenge()
            case ("2"):
                challengesBool = False
                challengesDone = True
                print("Letting you choose your own path.")
                print("")
            case ("no"):
                challengesBool = False
                challengesDone = True
                print("Letting you choose your own path.")
                print("")
            case _:
                print("Error parsing, please enter 1 or 2.")
                print("")

    while (challengesQty == False):
        challengesCheck = input("How many extra challenges would you like?\nInput a number (Max 3):\n")
        if (challengesCheck.isnumeric() == False):
            print("Error parsing, please enter a number.")
            print("")
        else:
            challengesQty = True
            challegeNum = int(challengesCheck)
            challengeQty = clamp(challegeNum, 1, 3)
            print(f"Adding {challengeQty} challenges.")
            print("")

    if (challengesBool == False):
        challengeQty = int(0)
    
    while (htmlCheck == False):
        htmlVar = input("Would you like the output as console, json, or HTML?\n1. Console\n2. Json\n3. HTML\n")
        match (htmlVar):
            case ("1"):
                output = "console"
                break;
            case ("2"):
                print("Outputting to JSON...\n")
                output = "json"
                break;
            case ("3"):
                print("Creating HTML...\n")
                output = "html"
                break;
            case _:
                print("Error parsing, please enter 1, 2, or 3.\n")
                break;
        
    args = [str(karmaBool), str(skillsBool), str(challengesBool), str(challengeQty), str(specialBool), playedGame, output]
    runNodeJS(args[0], args[1], args[2], args[3], args[4], args[5], args[6])

def runNodeJS(arg1, arg2, arg3, arg4, arg5, arg6, arg7):
    args = [arg1, arg2, arg3, arg4, arg5, arg6, arg7]
    node = subprocess.run(["node", "main.js", arg1, arg2, arg3, arg4, arg5, arg6, arg7])
    pass
     
def clamp(int : int, min : int, max : int):
    if (int < min):
        int = min
    elif (int > max):
        int = max
    return int

startUp()