# CHamoru_morphological_analysis
CHamoru stemming tool with CHamoru-English dictionary
Online at: https://guamlinguistics.com/morph/

## Table of Contents

- [About](#about)
- [Features](#features)
- [Authors](#authors)
- [License](#license)

## About

Online tool to help break down the morphology of longer CHamoru words, based on Guam orthography and spelling.
Intended as a project-internal tool for [chachalani.com](https://chachalani.com/).
Work in progress, so some features still need imlpementing (like defining the affix abbreviations).

Originally a spell-checking project, so affix dictionary is based on [Hunspell](https://hunspell.github.io/) files.
However, Hunspell does not support infixing or word-internal reduplication, and we found to be buggy for circumfixes, so we added some types (see aff.xlsx).

Recently rewritten for speed with Retrieval Tries, which we were going to use for look-ahead / look-behind. Decently fast -- can parse the entries for a whole dictionary (~10k words) in a second or two.

Now incoporated into [diksionariu.com](https://github.com/drdrphd/diksionariu.com), which has a nicer interface and better search options.
Also being incoporated into an online tool to read ELAN transcription files and offer appropriate breakdown and tagging for morphemes (in progress).

## Features

Includes:

- Morphological stemming
- Dictionary lookup for roots / Engliah-to-CHamoru terms

## Authors

Developed as part of a course on advanced language documentation, funded by the NSF.
Contributors: David Ruskin, Daniel Pangelinan, Jeremy Cepeda, Roseann Q. Pajarillo, Marciana Aguon, Loretta Cruz, Janice Toves, Nolan Flores, Jeniece Toves Hernandez
We are also appreciative of feedback from linguist Sandy Chung.

## License

Distributed under a GNU General Public License v3.0

Feel free to use and improve as you see fit.
