const lines = 3;

if (lines % 2 == 0 || lines < -1) return -1;
// for (let i = 1; i <= lines; i++) {
//   let line = "";
//   for (let j = 1; j < lines; j++) {
//     if (
//       (j <= i && i <= lines / 2) ||
//       (j <= lines - i + 1 && i > (lines + 1) / 2) ||
//       (i == (lines + 1) / 2 && j <= lines)
//     ) {
//       line += "*";
//     } else {
//       line += " ";
//     }
//   }

//   if (i == (lines - 1) / 2 || i == (lines + 3) / 2) {
//     line += " *";
//   } else if (i == (lines + 1) / 2) {
//     line += "***";
//   }
//   console.log(line);
// }

let space = "";
for (let j = 0; j < (lines - 1) / 2; j++) space += " ";

for (let i = 0; i < lines; i += 2) {
  let line = space;
  for (let k = 0; k < lines; k++) {
    if (k >= i) line += "@";
    if (k < i - k) line += " ";
  }
  console.log(line);
}

for (let i = 0; i < lines; i++) {
  let line = "";
  for (let k = 0; k < lines; k++) {
    if (i == 0) {
      line += "*";
    } else if (k == 0 || k == lines - 1) {
      line += "*";
    } else {
      line += " ";
    }
  }
  console.log(line);
}
