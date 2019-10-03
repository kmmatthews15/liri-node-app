# liri-node-app

## about the app

LIRI is a Language Interpretation Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data. The commands are:

*concert-this
*spotify-this-song
*movie-this
*do-what-it-says

## step by step instructions

1.Open your terminal such as Bash. 
2.Navigate to the folder that contains the '<liri.js>' file.
3.Depending on the command you run, the output will vary. 

**Example 1:** Run the '<concert-this>' command 

'<node liri.js concert-this <name of the artist or band> >'

Output: The system will display a list of all of the events and locations where the artist or band will perform. The system will also log this information in the log.txt file. 

![Image of Concert-This](./screenshots/concert-this.png)

**Example 2:** Run the '<spotify-this-song>' command

 '<node liri.js spotify-this-song <name of song> >'

Output: The system will diplay the information associated with the song. The system will also log this information in the log.txt file. 

![Image of Spotify-This-Song](./screenshots/spotify-this-song.png)

**Example 3:** Run the '<movie-this>' command

'<node liri.js movie-this <name of movie> >'

Ouput: The system will display the information associated with the movie that is inputed. The system will also log this information in the log.txt file. 

**Example 4:** Run the do-what-it-says command

'<node liri.js do-what-it-says>'

Output: The system will read the text in the random.txt file, and perform the comman listed in the random.txt file.

![Image of Do-What-It-Says](./screenshots/do-what-it-says.png)
