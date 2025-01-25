## Shortcut creator
##### by Abstergo##
#

#### I needed small program to create desktop shortuct of exe file in same directory as this executable
#### It was harder than i thought, so here is script maybe this is what you need

### How to use

1. Change parameters in main() to suit your needs.
2. Build with:
`
    g++ shortcut.cpp -o shortcut -lole32 -lshell32
`
3. Move to desired location
4. Run

!!!Warning Note it will always create shortcut on desktop of current user.
#### 