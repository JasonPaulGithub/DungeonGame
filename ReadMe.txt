This project inspired me to get into design patterns. I wanted to create a dungeon crawler game but I kept having trouble with the different libraries.

Things like which library for gravity to use, collision detection, A* pathfinding algorithums, etc.
It all had an effect on my games overall design. 

In the end I decided to move over to a Java based platform, which resulted in the Mario code here in my repo.

In any case, I had a lot of ideas. Ideas I may save for another project.

- Jason
-----------------------------------------------------------------------------------------------------------------------------------------------


/* use enableDiagonals on small enemies, make their collision radius smaller, and
 /  allow them to slow or halt the player
 /  allow for large enemies to have trouble moving around the map

 /'choose your door.....'
 /combat ideas: cleave. Rage. stun. charged attack. charge attack.
 /defence spells. summons. pets. AOE damage system. projectiles.
 /druid class (change into an animal?)
 /smoke. invisibility. mixing toxins for cloud-based AOE attacks.
 /attack combos! parry(combo breakers) enemies block distinct patterns
 /beserker rage enemy. being flanked. chase mechanics.
 /poisions, elemental damage, slow, and skill trees (perhaps only the mage can have this for now)
 /stealth kills

 / choose combo template: high, low, flanker, attack, block, parry (parry will relfect a percent of physical damage)
 / enemies counter patterns, like consecutive attacks low to high to low, but not high, block, low
 / opening attacks sets the base damage at %50, so an opening attack of 10 means the most damage made can be 5, crits hit up to 10, multipliers not included
 / weapons dont crit but will pass on damage onto flanking enemies, or STORE for an ulti attack.
 / more combos and abilties can be unlocked via the skill tree
 / near-death combos / abilities can be unlocked

 / mages can take down groups of weak eneimes and need XP to become better,
 / the theif takes down large enemies and can escape well against groups
 / fighters good all round but weak vs undead, clerics are tanks and speclaise against undead
 / it's all about the shop! play for money, items, & spells that mess with game mechanics.

 // with all this in mind start off with the basics, obvs...
 // + a story needed too
 // this will fire even if the orc hits a wall.
 // on a side note, enemies might fight amogst themselves
 // even a 'rage' style spell might work.

 // random room generation, random map generation, minimap,
 // issac style room generation, zombies board game random room generation, diablo style room generation.
 // each random style of generaion needs to consider physics/collision detection/pathfinding
 //

 */
/*
 TODO:
 Carpets: Include a dark fog sprite to mix with the carpet sprites to decorate the dungeon.
 TODO:
 The chest that you touch and the barrel that you bash and the bag that opens at any angle.
 TODO:
 Take the top beam of the door into the roof layer, darken the screen upon collision, play openDoor.mp3
 load a new map, then brighten the screen.
 //Distant future: Combat system. Skill trees. Classes. Menus. Sound. Projectiles. Magic. A story.
 Lighting. Stats on items.
 //TODO: This: Graphics: Add a drop shadow.
 */
