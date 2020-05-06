Now, when the Little Hacker Lady, logs into her dad’s computer she makes it
talk using the **say** command.

A command is a feature of the Operating System, using commands is a
management or administrative task, it is not really true programming, but
it is OK to call it that.

The say command uses [speech synthesis][1] to convert text to speech. The
say command resides on her dad’s computer, and thus uses her dad’s speaker.
She executes the command at [5:10][2]

The command she executes is wonderfully illustrative:

**say -v serena dad watch out**

You see that \-v that’s a special directive that states when executing the
say command use the voice of serena, serena is a cute name for a library of
sounds, the say command supports multiple voices, serena is one of them.

How do people know that \-v means voice, and how do they know that serena
is one of the voices? **Nobody knows this at first**, before a person
executes a command they read about it in a manual. The manual command is
called man and people usually type man followed by the command-name that
they want to learn about. In this case: man say (meaning bring up the
manual page for the say command). The man page will tell you how you can
list all the available voices too (say -v=?), a command like say can do
multiple things based on what you are trying to do. Here is the internet
version of a man page for say: [https://ss64.com/osx/say.html][3]

People are not happy with this. Many try to create simplified man pages,
here is one example [https://tldr.sh/][4] but it is always best to go to
the source, and just get used to the man command.

She didn’t need to use the serena voice library, she could have just
executed:

**say dad watch out**

And the say command would use the default voice. The say command is mostly
available on Macs, Raspberry Pi will likely use the espeak command.

**espeak "dad watch out"**

Espeak command is slightly different, for it gets confused by multiple
words, you have to join them together by wrapping them in quotes. A
programmer should demand that his program code has good hygiene. eSpeak
simply said “I am not just going to read everything that you type at me”
whereas the programmer that made the say command said “Let’s just assume
that whatever they throw at us needs to be converted to speech unless
something starts with a hyphen”. The say command makes assumptions, whereas
espeak is very strict about input.

[1]: https://en.wikipedia.org/wiki/Speech_synthesis
[2]: https://youtu.be/W76o_iG7Y7g?t=310
[3]: https://ss64.com/osx/say.html
[4]: https://tldr.sh/