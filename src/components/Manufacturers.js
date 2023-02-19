import innomed from "../images/INNOMED.webp";
import zoll from "../images/ZOLL.webp";
import chison from "../images/CHISON.webp";
import integral from "../images/INTEGRAL.webp";
import masimo from "../images/MASIMO.webp";
import medicalcables from "../images/MEDICALCABLES.webp";
import pyres from "../images/PYRES.webp";
import ultragel from "../images/ULTRAGEL.webp";
import meditech from "../images/MEDITECH.webp";

const extractNameFromImage = (string) => {
  const index = string.indexOf(".webp");
  return string.substring(10, index);
};

const manufacturers = [
  { manufacturer: innomed, name: extractNameFromImage(innomed), website: 'https://www.innomed.hu/'},
  { manufacturer: zoll, name: extractNameFromImage(zoll), website: 'https://www.zoll.com/'},
  { manufacturer: chison, name: extractNameFromImage(chison), website: 'https://www.chison.com/'},
  { manufacturer: integral, name: extractNameFromImage(integral), website: 'http://integral-process.fr/'},
  { manufacturer: medicalcables, name: extractNameFromImage(medicalcables), website: 'https://medicalcables.eu/' },
  { manufacturer: pyres, name: extractNameFromImage(pyres), website: 'https://pyres.com/'},
  { manufacturer: ultragel, name: extractNameFromImage(ultragel), website: 'https://ultragel.hu/en/home/'},
  { manufacturer: meditech, name: extractNameFromImage(meditech), website: 'https://www.meditech.hu/'},
  { manufacturer: masimo, name: extractNameFromImage(masimo), website: 'https://www.masimo.com/'},
];

export default manufacturers;
