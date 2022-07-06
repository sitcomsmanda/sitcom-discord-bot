# Peraturan dan Pedoman Kontribusi

- [Peraturan dan Pedoman Kontribusi](#peraturan-dan-pedoman-kontribusi)
  - [Pesan Commit](#pesan-commit)
  - [Panduan Bagi Teman-Teman SITCOM](#panduan-bagi-teman-teman-sitcom)
  - [Panduan Klon _Repo_](#panduan-klon-repo)

## Pesan Commit

Diharapkan untuk menulis pesan commit dengan format berikut.

| Format    | Keterangan                     |
| --------- | ------------------------------ |
| `add:`    | jika ingin menambah sesuatu    |
| `change:` | jika ingin merubah sesuatu     |
| `fix:`    | jika ingin memperbaiki sesuatu |
| `rm:`     | jika ingin menghapus sesuatu   |

[Back to Top](#peraturan-dan-pedoman-kontribusi)

## Panduan Bagi Teman-Teman SITCOM

Rentetan topik yang perlu dipelajari terlebih dahulu sebelum membuat bot menggunakan `discord.js`.

<table>
    <thead>
        <tr>
            <th rowspan="2">Pelajari Topik</th>
            <th colspan="2">Sumber Belajar</th>
        </tr>
        <tr>
            <th>Video Indonesia</th>
            <th>Literasi Daring</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>JavaScript Dasar</td>
            <td>
                <a href="https://youtube.com/playlist?list=PLFIM0718LjIWXagluzROrA-iBY9eeUt4w">Js Dasar - YT WPU</a>
            </td> 
            <td>
                <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript">Developer Mozilla</a>
            </td>
        </tr>
        <tr>
            <td>Ecma Script 6 (Js Terbaru)</td>
            <td>
                <a href="https://youtube.com/playlist?list=PLFIM0718LjIUGpY8wmE41W7rTJo_3Y46-">Js Lanjutan - YT WPU</a>
            </td>
            <td>
                <a href="https://javascript.info/">JavaScript Info</a>
            </td>
        </tr>
        <tr>
            <td>Konsep REST API</td>
            <td>
                <a href="https://youtube.com/playlist?list=PLFIM0718LjIW7AsIbnhFg15t9yx4H-sQ0">REST API - YT WPU</a>
                <a href="https://youtube.com/playlist?list=PL-CtdCApEFH-g0XS7fraWEZ28M8DiykC4">REST API - YT ProgrammerZamanNow</a>
            </td>
            <td>
                 <a href="https://en.wikipedia.org/wiki/Representational_state_transfer">Wikipedia</a>
            </td>
        </tr>
        <tr>
            <td>Git dan Github</td>
            <td>
                <a href="https://youtube.com/playlist?list=PLFIM0718LjIVknj6sgsSceMqlq242-jNf">GIT & GITHUB - YT WPU</a>
            </td>
            <td>
                <a href="https://git-scm.com/doc">Git Docs</a>
            </td>
        </tr>
        <tr>
            <td>NodeJS Dasar</td>
            <td>
                <a href="https://youtube.com/playlist?list=PLFIM0718LjIW-XBdVOerYgKegBtD6rSfD">Belajar NodeJS & NPM - YT WPU</a>
            </td>
            <td>
                <a href="https://nodejs.org/en/docs/">NodeJS Docs</a>
            </td>
        </tr>
        <tr>
            <td>NPM Dasar</td>
            <td>
                <a href="https://youtube.com/playlist?list=PLFIM0718LjIW-XBdVOerYgKegBtD6rSfD">Belajar NodeJS & NPM - YT WPU</a>
            </td>
            <td>
                <a href="https://docs.npmjs.com/">NPM Docs</a>
            </td>
        </tr>
        <tr>
            <td>Library Discord.js</td>
            <td>
               -
            </td>
            <td>
                <a href="https://discordjs.guide/">DiscordJS Guide</a>
            </td>
        </tr>
    </tbody>
</table>

[Back to Top](#peraturan-dan-pedoman-kontribusi)

## Panduan Klon _Repo_

1. Buka _console_ dan ikuti perintah `git` berikut.

```sh
git clone https://github.com/sitcomsmanda/sitcom-discord-bot.git
```

2. Pindah ke direktori `sitcom-discord-bot`.

```sh
cd .\sitcom-discord-bot
```

3. Lalu, _install_ semua `packages` yang diperlukan.

```sh
npm i
```

4. _Repo_ telah selesai di klon ke mesin lokal, coba tes dengan perintah berikut.

```sh
npm run dev
```

Catatan: isi file `.env` terdapat di folder gdrive `./documents/SITCOM-BOT/.env` akun utama sitcom atau bisa ditanyakan kepada pengelola repo ini. 

[Back to Top](#peraturan-dan-pedoman-kontribusi)
