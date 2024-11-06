
mechantID = "PT"
price = "250"
pay = input("enter mechant_ID " )
user = pay

if user == mechantID:
    amount = input("Enter amount ")
    if amount == price:
        print("You have succesfully payed, thank you for Trusting PowerTools")
    else:
         print("Please try again")
else:
    print("Incorrect MechantID")
