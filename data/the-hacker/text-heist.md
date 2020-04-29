She likley stole her daddy’s dad’s password by using her older brother’s
[key logger][1]. To log into her dad’s computer she uses the ssh command.
ssh is just a program that establishes a secure (encrypted) connection
between two computers. She executes ssh alex@192.168.1.27 at [1:27][2]. And
begins using the ssh program.

The remote shell, for convenience sake, looks almost the same as her own
local shell. Even though very little changes on her screen she is in a
full-screen program now, and once she is authenticated her shell prompt
changes to that of the remote system. It goes from pi@calebpi ~ $ to
\[\]~$\[\].

A shell prompt is the thing that indicates that you are free to type
commands. Her dad’s shell prompt is broken, he messed up with whatever was
supposed to go in between those square brackets, it maybe that he is using
fonts that the Raspberry PI does not have, or some mess like that. My
prompt as I write this is \[user@computer warrior\]$ that means username is
user, my computer’s network name is computer, and the directory I am in is
warrior.

The dollar sign $ indicates that I, alex, and pi are normal users. You can
escalate your system privileges to become a system administrator where you
can read or delete other user’s files. On most systems the dollar sign
would then change to the pound sign # to indicate that care must be taken
as you are in special privileges mode, often called [root][3].

[1]: https://www.amazon.com/keylogger/s?k=keylogger
[2]: https://youtu.be/W76o_iG7Y7g?t=87
[3]: http://www.catb.org/~esr/jargon/html/R/root.html