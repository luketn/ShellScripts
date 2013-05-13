# Setting PATH for Python 2.7
# The orginal version is saved in .bash_profile.pysave
PATH="/Library/Frameworks/Python.framework/Versions/2.7/bin:${PATH}"
export PATH

# MacPorts Installer addition on 2012-08-22_at_22:57:37: adding an appropriate PATH variable for use with MacPorts.
export PATH=/opt/local/bin:/opt/local/sbin:$PATH
# Finished adapting your PATH environment variable for use with MacPorts.

## Colorize the ls output ##
export CLICOLOR=1
export LSCOLORS=Exfxcxdxbxegedabagacad

# #Use a long listing format ##
alias ll='ls -lh'
