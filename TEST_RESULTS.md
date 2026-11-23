# TEST_RESULTS — A Day of One-Line Pitches

Date: 2026-11-24 ~02:20 WIB (2026-11-23 ~19:20 UTC). Runner: Node v24.22.1 (grader runs node22).

## Final pitch (the whole entry)

> "The app you've been imagining only needs your words: an AI agent on make.fun will build a working version of it for you — you don't need to code, you only need the idea."

- Characters: 169 (limit 240) — PASS
- Sentences: 1, ends with a period (the dot in `make.fun` is a domain name, not a sentence break) — PASS
- Lines on stdout: exactly 1, sentence + trailing newline, nothing else — PASS
- Truth audit: every claim is verifiable — describing an idea in plain words, an AI agent building a working version, no coding needed, free entry. No invented numbers, no guarantees of success or earnings, no "in minutes" — PASS

## SolAPI / judge status (honest)

- `list-models`: HTTP 200, 23 models incl. `gpt-6.1-sol` — OK.
- `chat` (pitch drafting + judge pass): POST /v1/responses returned **HTTP 503 on all 3 attempts** (same outage as 22–23 Nov). **No gpt-6.1-sol judge score is claimed.**
- Substitute used: structured self-critique of 5 candidate pitches (180/187/180/162/164 chars), scored on persuasiveness, clarity, truth in one read. Winner: candidate 3b (169 chars) — warmest open ("The app you've been imagining…"), strongest close ("you don't need to code, you only need the idea"), zero invented claims. The 2-Pass Critique 95/100 gate could NOT run while SolAPI is down; this is recorded, not hidden.

## Local runs (determinism)

| Run | Command | Exit | sha256 of stdout |
|-----|---------|------|------------------|
| 1 | `node main.ts` | 0 | `25ea6318ffb2d260118c25ea877e0717af49584941255b50983b1dc5c12533d8` |
| 2 | `node main.ts` | 0 | `25ea6318ffb2d260118c25ea877e0717af49584941255b50983b1dc5c12533d8` |
| 3 | `node main.ts` (after main.ts revision) | 0 | `25ea6318ffb2d260118c25ea877e0717af49584941255b50983b1dc5c12533d8` |
| 4 | `node main.ts` (after main.ts revision) | 0 | `25ea6318ffb2d260118c25ea877e0717af49584941255b50983b1dc5c12533d8` |

- Determinism: all 4 runs byte-identical; output unchanged after the revision — PASS
- `node --check main.ts`: syntax OK — PASS
- Self-checks inside `main.ts` (length ≤ 240, exactly one sentence, single line): pass on every run — PASS

## Package checks

- `.makefun/owner.json`: exactly 58 bytes (`{"wallet": "<agent wallet>"}` + space after colon + trailing newline), wallet appears once — PASS
- `LICENSE`: first line `SPDX-License-Identifier: MIT`, full MIT text — PASS
- `README.md`: all three live make.fun badges with owner `tukiyatlampu` and repo `u-ronigrv-a-day-of-one-line-pitches-12cd9bb3`, link to the bounty page, no `{owner}`/`{repo}`/`{referral_code}` placeholders left — PASS
- Zero-fail QA: no secrets, API keys, tokens, or absolute paths in `main.ts`, `README.md`, `LICENSE`; the wallet address appears only in `.makefun/owner.json` where the repo-owner check requires it — PASS

## NOT run (gap, for the parent before submit)

## Parent fix — main.ts now writes /output/entry.txt (2026-11-24 ~02:30 WIB)

- Verifikasi independen parent terhadap RULES.txt/competition.yaml menemukan: program WAJIB menulis `/output/entry.txt` ("Your program writes one text to /output/entry.txt"); main.ts koordinator hanya `console.log` — tanpa fix, entri INVALID (Valid=0, tidak pernah dinilai). Pola yang sama dipakai awe + curious (keduanya `writeFileSync` ke entry.txt).
- Perbaikan (parent, via write/edit di sesi ini): `main.ts` kini `writeFileSync(join(outDir, "entry.txt"), PITCH, "utf8")` dengan `outDir = MAKEFUN_OUTPUT_DIR ?? "/output"`, `mkdirSync` rekursif, tanpa menghapus dir output. Teks pitch TIDAK berubah.
- Verifikasi ulang: `node --check main.ts` OK; 2 run dengan `MAKEFUN_OUTPUT_DIR=/tmp/pitch-out` — stdout sha256 tetap `25ea6318ffb2d260118c25ea877e0717af49584941255b50983b1dc5c12533d8` (identik dengan sebelum fix); `entry.txt` 171 byte = 169 karakter (1 em-dash = 3 byte UTF-8), sha256 `b0fac4b8247f5ea9c631000a5da374fe7aeeb7346d3536d510dbb94c83c89a26` identik di 2 run — PASS (gate 1–240 karakter terpenuhi).

- Kit check (`node cli/makefun.mjs check`): **not run** — the kit tarball download URL is not exposed by `get_kit` (only file hashes), and the guessed endpoints (`/kit.tar.gz`, `/kit/download`, `/kit/<slug>.tar.gz`) returned 404. The parent should run the kit check from the unpacked kit if available before submitting.
- `makefun record` / `git init` / `git clone`: **deliberately not run** in the package dir (user decision on git init still pending; system security notice blocks it). No submit was attempted from this session.
