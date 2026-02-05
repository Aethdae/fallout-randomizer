import subprocess


playedGame = "nv"
karmaBool = False
skillsBool = False
specialBool = False
challengesBool = False
challengeQty = 0

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

    playedGame = "nv"
    #print("Welcome to the Fallout 3/New Vegas Randomizer!")
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
                print("Well that was lucky!... or not?\n")
            case ("2"):
                specialDone = True
                print("Letting you choose your own path.\n")
            case _:
                print("Error parsing, please enter 1 or 2.\n")
                
    while (karmaDone == False):
        karmaCheck = input("Would you like to randomize karma? (Y/N)\n1. Yes\n2. No\n")
        match (karmaCheck.lower()):
            case ("1"):
                karmaDone = True
                setKarma()
                print("I wonder how you'll treat people?")
                print("")
            case ("yes"):
                karmaDone = True
                setKarma()
                print("I wonder how you'll treat people?")
                print("")
            case ("2"):
                karmaDone = True
                print("Letting you choose your own path.")
                print("")
            case ("no"):
                karmaDone = True
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
                print("Who knows what you'll learn?")
                print("")
                setSkills()
            case ("yes"):
                skillsDone = True
                print("Who knows what you'll learn?")
                print("")
                setSkills()
            case ("2"):
                skillsDone = True
                print("Letting you choose your own path.")
                print("")
            case ("no"):
                skillsDone = True
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
                challengesQty = False
                print("Ooh, a challenge has been accepted!")
                print("")
                setChallenge()
            case ("yes"):
                challengesDone = True
                challengesQty = False
                print("Ooh, a challenge has been accepted!")
                print("")
                setChallenge()
            case ("2"):
                challengesDone = True
                print("Letting you choose your own path.")
                print("")
            case ("no"):
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
            challengeQty = challengesCheck
            print (f"Adding {clamp(challegeNum, 1, 3)} challenges.")

    if (challengesBool == False):
        challengeQty = "0"

    args = [str(karmaBool), str(skillsBool), str(challengesBool), challengeQty, str(specialBool), playedGame]
    print("before Node")
    runNodeJS(args[0], args[1], args[2], args[3], args[4], args[5])

def runNodeJS(arg1, arg2, arg3, arg4, arg5, arg6):
    args = [arg1, arg2, arg3, arg4, arg5, arg6]
    node = subprocess.run(["node", "main.js"] + args)
    
    print("after Node")
    pass
     
def clamp(int : int, min : int, max : int):
    if (int < min):
        int = min
    elif (int > max):
        int = max
    return int

startUp()