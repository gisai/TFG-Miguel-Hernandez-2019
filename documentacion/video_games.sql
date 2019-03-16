
-- http://localhost/phpmyadmin

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `test`
--

-- --------------------------------------------------------

--
-- Table structure `video_games`
--

CREATE TABLE IF NOT EXISTS `video_games` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `console` varchar(255) NOT NULL,
  `price` double NOT NULL DEFAULT '0',
  `players` int(11) NOT NULL DEFAULT '0',
  `comments` text NOT NULL,
  KEY `ID` (`ID`)) 
  ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=51 ;

--
-- Table content `video_games`
--

INSERT INTO `video_games` (`ID`, `name`, `owner`, `console`, `price`, `players`, `comments`) VALUES
(1, 'Super Mario Bros', 'John', 'NES', 4, 1, 'Fantastic game!'),
(2, 'Sonic', 'Patrick', 'Megadrive', 2, 1, 'Best game ever created'),
(3, 'Zelda : Ocarina of Time', 'John', 'Nintendo 64', 15, 1, 'Incredible and beautiful game'),
(4, 'Mario Kart 64', 'John', 'Nintendo 64', 25, 4, 'An excellent kart game'),
(5, 'Super Smash Bros Melee', 'Michael', 'GameCube', 55, 4, 'Great'),
(6, 'Dead or Alive', 'Patrick', 'Xbox', 60, 4, 'Not bad'),
(7, 'Dead or Alive Xtreme Beach Volley Ball', 'Patrick', 'Xbox', 60, 4, 'Not bad at all'),
(8, 'Enter the Matrix', 'Michael', 'PC', 45, 1, 'Almost like the movie'),
(9, 'Max Payne 2', 'Michael', 'PC', 50, 1, 'Almost like a movie'),
(10, 'Yoshi''s Island', 'John', 'SuperNES', 6, 1, 'Yoshi''s paradise'),
(11, 'Commandos 3', 'John', 'PC', 44, 12, 'A great WWII game'),
(12, 'Final Fantasy X', 'Patrick', 'PS2', 40, 1, 'Good!'),
(13, 'Pokemon Rubis', 'John', 'GBA', 44, 4, 'Pika-Pika-chu !!!'),
(14, 'Starcraft', 'Michael', 'PC', 19, 8, 'Masterpiece'),
(15, 'Grand Theft Auto 3', 'Michael', 'PS2', 30, 1, 'Revolutionary'),
(16, 'Homeworld 2', 'Michael', 'MichaelPC', 45, 6, 'Great strategy game'),
(17, 'Aladdin', 'Patrick', 'SuperNES', 10, 1, 'Like playing the movie'),
(18, 'Super Mario Bros 3', 'Michael', 'SuperNES', 10, 2, 'Best Mario ever'),
(19, 'SSX 3', 'John', 'Xbox', 56, 2, 'Good snowboard game'),
(20, 'Star Wars : Jedi outcast', 'Patrick', 'Xbox', 33, 1, 'May the force be with you'),
(21, 'Actua Soccer 3', 'Patrick', 'PS', 30, 2, 'Good football game'),
(22, 'Time Crisis 3', 'John', 'PS2', 40, 1, 'Good shooting game'),
(23, 'X-FILES', 'Patrick', 'PS', 25, 1, 'More or less like the series'),
(24, 'Soul Calibur 2', 'Patrick', 'Xbox', 54, 1, 'Fight!'),
(25, 'Diablo', 'John', 'PS', 20, 1, 'Incredibly addictive!'),
(26, 'Street Fighter 2', 'Patrick', 'Megadrive', 10, 2, 'Round 2! Fight!'),
(27, 'Gundam Battle Assault 2', 'John', 'PS', 29, 1, 'I don''t know anything about this game'),
(28, 'Spider-Man', 'John', 'Megadrive', 15, 1, 'Good game based on the comics'),
(29, 'Midtown Madness 3', 'Michael', 'Xbox', 59, 6, 'The city is yours'),
(30, 'Tetris', 'John', 'Gameboy', 5, 1, 'Best puzzle game ever'),
(31, 'The Rocketeer', 'Michael', 'NES', 2, 1, 'Based on the motion picture'),
(32, 'Pro Evolution Soccer 3', 'Patrick', 'PS2', 59, 2, 'Fantastic football game'),
(33, 'Ice Hockey', 'Michael', 'NES', 7, 2, 'Good hockey game'),
(34, 'Sydney 2000', 'John', 'Dreamcast', 15, 2, 'Like participating in the Olimpic Games'),
(35, 'NBA 2k', 'Patrick', 'Dreamcast', 12, 2, 'Three points, buddy!'),
(36, 'Aliens Versus Predator : Extinction', 'Michael', 'PS2', 20, 2, 'Terrific!'),
(37, 'Crazy Taxi', 'John', 'Dreamcast', 11, 1, 'Like a unreal taxi driver'),
(38, 'Metal Gear Solid 2', 'James', 'PS2', 10, 1, 'Not as good as the first one'),
(39, 'FIFA 64', 'Michael', 'Nintendo 64', 25, 2, 'Another FIFA...'),
(40, 'Who Wants to be a Millionaire?', 'John', 'PS2', 10, 1, 'Like on TV!'),
(41, 'Monopoly', 'Homer', 'Nintendo 64', 21, 4, 'Buy that street!'),
(42, 'Taxi 3', 'Kathy', 'PS2', 19, 4, 'If you liked the movie..'),
(43, 'Indiana Jones and the Emperor''s Tomb', 'John', 'PS2', 25, 1, 'Indy is back'),
(44, 'F-ZERO', 'James', 'GBA', 25, 4, 'Futuristic and ultrafast vehicles'),
(45, 'Harry Potter and the Chamber of Secrets', 'James', 'Xbox', 30, 1, 'Harry is back!'),
(46, 'Half-Life', 'Kathy', 'PC', 15, 32, 'One of the best games ever created'),
(47, 'Myst III Exile', 'Homer', 'Xbox', 49, 1, 'Grear adventure game!'),
(48, 'Wario World', 'Homer', 'Gamecube', 40, 4, 'Wario vs Mario!'),
(49, 'Rollercoaster Tycoon', 'John', 'Xbox', 29, 1, 'Create your own theme park!'),
(50, 'Splinter Cell', 'Patrick', 'Xbox', 53, 1, 'Incredible infiltration game');
