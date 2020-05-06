In the next example we have a Boolean flag "-u" meaning enable underline
mode. To disable the underline mode, you simply remove the -u. Then we have
the extended argument "--format" followed by a directive "capitalize".
Supported directives can be found in documentation.

print -u --format capitalize "hello world"

To make things easier to type, most commands allow short form of extended
arguments, so --format can become -f.

print -u -f capitalize "hello world"

Conversely, most one letter arguments/flags have an extended form that
begins with two hyphens. Note how -u changed to --underline.

print --underline -f capitalize "hello world"

For clarity and readability, I recommend using extended forms.

print --underline --format capitalize "hello world"