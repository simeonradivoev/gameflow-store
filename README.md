# The Gameflow Store
This is the store for the [Gameflow Deck](https://github.com/simeonradivoev/gameflow-deck)

## Contributing
There are defined schema files for all entries. Using VSCode should pick them up automatically.

`buckets/emulators`
Emulator definitions that define where to download them as well as their metadata
`buckets/games`
Free game definitions. Currently only direct downloads work.

For details on the schema check out the comments in the schema files. Or using VS code.

To Submit a an addition or change either do a PR or open an Issue on store's [Github](https://github.com/simeonradivoev/gameflow-store)
## The Dark Mod

`buckets/games/the-dark-mod.json` uses the [full 2.14 release](https://www.moddb.com/downloads/the-dark-mod-214-full), ModDB file `306419` (`darkmod214.zip`). The release contains both `TheDarkModx64.exe` and `thedarkmod.x64`, plus the data; the small installers on the [official downloads page](https://www.thedarkmod.com/downloads/) are not complete game archives. Both entries use Gameflow's existing generated launch wrappers with the installation directory as their working directory. The Linux wrapper also makes the native executable executable. No Wine or separate engine is required.

Controller support is native. The [official bindings documentation](https://wiki.thedarkmod.com/index.php/Bindings_and_User_Settings#Gamepad_Default_Bindings) describes the shipped layout. The engine loads `default.cfg`, then any user `DarkmodPadbinds.cfg`; preserve those bindings rather than applying GZDoom's `use_joystick` or `[Doom.Bindings]` settings. Sticks provide movement/look and move the menu cursor; A or RT selects in menus. In gameplay A jumps, B crouches (hold to mantle), X attacks, Y uses inventory, RT interacts, and Start opens the menu. LT is the modifier for secondary actions. Use a standard gamepad layout in Steam Input. The engine uses GLFW and polls the first recognized gamepad; the wrapper's SDL duplicate-device filter does not configure GLFW.

Mission save backups use `fms/*/savegames/**/*` relative to the installation root, following the engine's per-mission save directory. The packaged 600 x 900 portrait cover is the unmodified [SteamGridDB artwork](https://cdn2.steamgriddb.com/grid/c962049ace4df5f79665636c1fea6f36.png), also displayed on [Mulderland's game page](https://www.mulderland.com/en/games/the-dark-mod). It depicts The Dark Mod title, clockwork, and gothic skyline. Artwork belongs to its respective creators and is used to identify the game; it is not original Gameflow artwork.

Validation on Windows (2026-09-09): JSON and runtime SDK schemas passed, catalog generation passed, and `bun test src/tests/store-launch.test.ts` passed in Gameflow Deck (1 test, 4 assertions). Upstream release documentation confirms archive filename and native launch targets. ModDB returned HTTP 403 with a browser challenge, including with Gameflow's browser headers, so archive extraction and end-to-end installation/gameplay were not verified. Linux and physical controller behavior require device testing. This catalog change must be delivered through an updated Store package or `CUSTOM_STORE_PATH` before other installations see it.
