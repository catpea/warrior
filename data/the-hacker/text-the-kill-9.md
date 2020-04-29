At [3:49][1] the Little Lady Hacker explains that she will be shutting down
her dad’s code editor, and writes down the Process ID number 95251. Mac
users frequently use [Sublime Text][2] code editor. She issues the kill
command with the \-9 switch, this is a terrible idea, as it basically
crashes her dad’s code editor and the \-9 ensures there is no way to save
data. Here is the man page for the kill command
[https://linux.die.net/man/1/kill][3]. Unix programs that are actively
running are called processes (as in a program that is processing something)
and each process has a number. The kill command can be used during
development and debugging, in a reboot scenario, or when battery is about
to die on a laptop, it has its proper uses. As a joke, it is already bad
enough to use the kill command on a process as it sends a TERM\[inate\]
signal. As a programmer you can add a signal handler in your program, and
then in case of TERM signal you can for example ask the user to save his
data, the TERM signal is an advisory. The -9 sends a KILL signal. There is
no handler for the KILL signal, there is no saving work, the process is
destroyed by the Operating System, whatever he was working on is lost. She
executes kill -9 95251 at [5:26][4] his code editor disappears instantly.
**Yikes!**

[1]: https://youtu.be/W76o_iG7Y7g?t=229
[2]: https://www.sublimetext.com/
[3]: https://linux.die.net/man/1/kill
[4]: https://youtu.be/W76o_iG7Y7g?t=326