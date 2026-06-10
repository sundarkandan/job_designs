import Esha from "../assets/esha.webp"
import Salem from "../assets/salem.jpg"
import tiruchy from "../assets/tirchy.avif"
import PondyCherry from "../assets/pondycherry.jpg"
import Banglore from "../assets/banglore.jpg"
import Madurai from "../assets/madurai.jpg"
import Tiruvannamalai from "../assets/tiruvannamalai.jpg"
import Tiruppathi from "../assets/thiruppathi.jpg"
import vellore from "../assets/vellore.jpg"

import Dizer from "./dizire.png"
import eitos from "./eitos.png"

import ertiga from "./ertiga.png"
import kia from "./kia.png"
import xylo from "./xylo.png"
import marazzo from "./marazzo.png"

import innova from "./innova.png"

// ... (imports remain the same)

export const vehicles = {
  sedan: {
    name: { en: 'Premium Sedan', ta: 'பிரீமியம் செடான்' },
    rate: 16,
    rate2:14,
    tag: { en: 'Dzire / Etios', ta: 'டிசையர் / எட்டியோஸ்' },
    seats: '4+1',
    bags: '2 Bags',
    slides: [Dizer, eitos],
  },
  suv: {
    name: { en: 'Executive SUV', ta: 'எக்ஸிகியூட்டிவ் எஸ்யூவி' },
    rate: 20,
    rate2:19,
    tag: { en: 'Ertiga / Marazzo', ta: 'எர்டிகா / மராசோ' },
    seats: '6+1',
    bags: '4 Bags',
    slides: [ertiga, xylo, kia, marazzo],
  },
  innova: {
    name: { en: 'Innova Premium', ta: 'இன்னோவா பிரீமியம்' },
    rate: 21,
    rate2:20,

    tag: { en: 'Innova High-Roof', ta: 'இன்னோவா ஹை-ரூஃப்' },
    seats: '7+1',
    bags: '5 Bags',
    slides: [innova],
  },
  crysta: {
    name: { en: 'Innova Crysta Elite', ta: 'இன்னோவா கிறிஸ்டா எலைட்' },
    rate: 24,
    rate2: 23,
    tag: { en: 'Luxury MPV', ta: 'சொகுசு எம்பிவி' },
    seats: '7+1',
    bags: '6 Bags',
    slides: [innova],
  },
};

// ... (rest of your exports)

export const popularDestinations = [
  {
    title: { en: 'Chennai (To) Coimbatore', ta: 'சென்னை (To) கோயம்புத்தூர்' },
    img: Esha
  },
  {
    title: { en: 'Chennai (To) Salem', ta: 'சென்னை (To) சேலம்' },
    img: Salem,
  },
  {
    title: { en: 'Chennai (To) Trichy', ta: 'சென்னை (To) திருச்சி' },
    img: tiruchy,
  }, 
  {
    title: { en: 'Chennai (To) Pondicherry', ta: 'சென்னை (To) பாண்டிச்சேரி' },
    img: PondyCherry,
  },
  {
    title: { en: 'Chennai (To) Bangalore', ta: 'சென்னை (To) பெங்களூரு' },
    img: Banglore,
  },
  {
    title: { en: 'Chennai (To) Madurai', ta: 'சென்னை (To) மதுரை' },
    img: Madurai,
  }, 
  {
    title: { en: 'Chennai (To) Tiruvannamalai', ta: 'சென்னை (To) திருவண்ணாமலை' },
    img: Tiruvannamalai,
  },
  {
    title: { en: 'Chennai (To) Tirupati', ta: 'சென்னை (To) திருப்பதி' },
    img: Tiruppathi,
  },
  {
    title: { en: 'Chennai (To) Vellore', ta: 'சென்னை (To) வேலூர்' },
    img: vellore,
  }
];

export const WHATSAPP_NUMBER = '918015785116';
export const PHONE_NUMBER = '+918015785116';
