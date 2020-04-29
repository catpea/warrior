Please read [github.com/NARKOZ/hacker-scripts][1] Which "hack" this poor
bastard's coffemaker, soon to be ruined romantic life, a particularly needy
customer, and alcoholism. Based on a true story, apparently.

Please note how the community of geeks that love this story came together
and started re-creating these "hacker" scripts in the programming languages
they favor; probably out of sadness.

Here is the Node.js Version of [fucking\_coffee.js][2]. Note that once the
telnet connection is established at line number 22, we begin using the
coffeemaker command-line interface: sys brew (line 26), sys pour (line 32).

Don't think of the coffeemaker as running UNIX, just think of it as it
being controlled by a command line interface somewhere.

Any machine with a button or two is a system with enough complexity to
benefit from a command-line interface.

Note how you have never programmed a coffeemaker before, and yet you know
precisely - and may even remember for months to come - the commands "sys
brew" and "sys pour".

sys brew

sys pour

It seems sys is a single command that looks at the first text argument.
Executing sys -h would probably print:

 Coffemaker Help ---- -h / --help print this text -v / --verbose print
debugging information -b / --brew / or simply brew start brewing -p /
--pour / or simply pour start pouring -r / --reboot / or simply reboot
reboot the system ... 

Lack of proper etiquette, and using text (brew) instead of arguments
(--brew/-b) can be an indication of sys being a script that does not take
the time to parse anything it just looks at the first thing after the
command name. It is actually difficult to parse arguments (-b/--brew), it
takes no effort at all to use raw text (brew).

[1]: https://github.com/NARKOZ/hacker-scripts
[2]: https://github.com/NARKOZ/hacker-scripts/blob/master/nodejs/fucking_coffee.js