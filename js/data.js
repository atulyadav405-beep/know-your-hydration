/* ═══════════════════════════════════════════════════════════
   Shared data — Consumer Facing Dashboard
   Source: Clinical Dashboard (atulyadav405-beep.github.io/hydration-reference)
═══════════════════════════════════════════════════════════ */

const PRODUCTS = [
  {id:'electral',      name:'Electral',                     cat:'clinical',    na:1725, k:780,  mg:0,   sugar:13.5, tonic:'Hypotonic', ev:'high',
   use:['illness'], constraints:[],
   origin:'FDC Ltd, India — WHO formula',
   best:"India's #1 ORS. Acute diarrhea, vomiting, severe dehydration. WHO-formula compliant.",
   mechanism:'Strict WHO formula. SGLT1 cotransport pulls water even with severely damaged intestinal villi. Only WHO-recommended ORS available in tetra-pack in India.',
   caveat:'Illness use only. Not a sports drink — sodium too high for non-illness contexts.',
   ref:'FSSAI Directive 2025', badge:'WHO Formula'},

  {id:'who-ors',       name:'WHO ORS',                      cat:'clinical',    na:1725, k:780,  mg:0,   sugar:13.5, tonic:'Hypotonic', ev:'high',
   use:['illness'], constraints:[],
   origin:'WHO/UNICEF, 2003 standard',
   best:'Acute diarrhea, cholera, paediatric dehydration. Gold standard globally.',
   mechanism:'SGLT1 cotransport pulls hundreds of water molecules per Na + glucose absorption cycle. Intact even when intestinal villi are severely damaged.',
   caveat:'Not appropriate as daily/sports drink. Do not exceed prescribed dose.',
   ref:'WHO Diarrhoea Treatment Guidelines 2005', badge:'Clinical Gold Standard'},

  {id:'pedialyte',     name:'Pedialyte / Hydralyte',        cat:'clinical',    na:1035, k:780,  mg:0,   sugar:6,    tonic:'Hypotonic', ev:'high',
   use:['illness'], constraints:[],
   origin:'Abbott — Australia/USA',
   best:'Paediatric dehydration. Lower sodium suited to children.',
   mechanism:'45 mEq/L Na (vs WHO 75) reduces hypernatremia risk in children. Some formulations contain zinc for anti-diarrheal effect.',
   caveat:'Insufficient sodium for severe dehydration in adults — use WHO ORS instead.',
   ref:'AAP Diarrhea Guidelines', badge:'Paediatric'},

  {id:'ph1500',        name:'Precision Hydration PH 1500',  cat:'global',      na:750,  k:125,  mg:12,  sugar:1,    tonic:'Hypotonic', ev:'high',
   use:['exercise','heat'], constraints:[],
   origin:'UK — Precision Fuel & Hydration',
   best:'Heavy/salty sweaters, ultra-endurance, hot races. Sweat-test driven personalisation.',
   mechanism:'750 mg Na per 500 ml matches sweat sodium loss for heaviest-sweating quartile. WADA batch-tested.',
   caveat:'Overkill for casual exercisers. Cost prohibitive for daily use.',
   ref:'Maughan et al. 2018', badge:'WADA Tested'},

  {id:'ph1000',        name:'Precision Hydration PH 1000',  cat:'global',      na:500,  k:125,  mg:12,  sugar:1,    tonic:'Hypotonic', ev:'high',
   use:['exercise'], constraints:[],
   origin:'UK — Precision Fuel & Hydration',
   best:'Endurance training, racing in moderate heat, triathlons.',
   mechanism:'Mid-range sodium for typical sweat profile. Hypotonic for fast gastric emptying during exercise.',
   caveat:'Designed for active use, not daily desk hydration.',
   ref:'Precision Fuel & Hydration Lab Reports', badge:'Endurance'},

  {id:'lmnt',          name:'LMNT',                         cat:'global',      na:1000, k:200,  mg:60,  sugar:0,    tonic:'Hypotonic', ev:'med',
   use:['exercise','heat','keto'], constraints:['hypertension'],
   origin:'USA — Robb Wolf, 2018',
   best:'Endurance athletes, keto, heavy sweaters, hot climates. Highest commercial sodium.',
   mechanism:'Aggressive sodium replacement for athletes with sweat sodium in upper range (60–80+ mmol/L). Magnesium malate form is well-absorbed.',
   caveat:'Risk of overdose for sedentary users or those with hypertension.',
   ref:'AND Position Statement 2016', badge:'Keto Friendly'},

  {id:'nuun',          name:'Nuun Sport',                   cat:'global',      na:300,  k:150,  mg:25,  sugar:1,    tonic:'Hypotonic', ev:'med',
   use:['daily','exercise'], constraints:[],
   origin:'USA — Seattle, 2004',
   best:'Daily hydration, light athletic use, convenient effervescent tablet.',
   mechanism:'5-electrolyte effervescent tablet. Low sodium suited to non-heavy-sweaters.',
   caveat:'Insufficient sodium for endurance or heat. Mg oxide form has poor bioavailability (~4%).',
   ref:'220 Triathlon Review', badge:'Effervescent'},

  {id:'nuun-zero',     name:'Nuun Zero Sugar',              cat:'global',      na:200,  k:125,  mg:20,  sugar:0,    tonic:'Hypotonic', ev:'med',
   use:['daily'], constraints:[],
   origin:'USA — Nuun Hydration',
   best:'Office daily use, sugar-free preference, light activity.',
   mechanism:'Zero-sugar version of Nuun Sport. Lower sodium than Sport variant.',
   caveat:'Not for endurance or heat. Mg form is oxide (poor bioavailability).',
   ref:'Nuun Spec Sheet', badge:'Zero Sugar'},

  {id:'osmo',          name:'Osmo',                         cat:'indian',      na:400,  k:250,  mg:100, sugar:0,    tonic:'Hypotonic', ev:'med',
   use:['daily','exercise','heat'], constraints:[],
   origin:'India DTC — Wellversed',
   best:'Daily hydration, athletics, heat exposure. Most complete Indian DTC stack.',
   mechanism:'Full electrolyte stack: Na/K/Mg/Ca/Cl + Zn (AQP3/7 expression) + Boron (renal Mg/Ca retention) + Taurine 1.3g (organic osmolyte for heat) + B1 thiamine.',
   caveat:'No glucose = no SGLT1 activation. Not for acute illness (use WHO ORS instead).',
   ref:'PMC4712861, PMC12943169', badge:'Full Stack'},

  {id:'liquidiv',      name:'Liquid I.V.',                  cat:'indian',      na:500,  k:370,  mg:0,   sugar:11,   tonic:'Hypotonic', ev:'med',
   use:['recovery','illness'], constraints:['diabetes'],
   origin:'USA DTC (available India)',
   best:'Fast ORS-style rehydration, illness recovery, post-travel dehydration.',
   mechanism:'Cellular Transport Technology = SGLT1 cotransport via 5g glucose + 500 mg Na.',
   caveat:'370 mg K with 0 mg Mg = Na/K-ATPase limitation (Apell 2017). 11g sugar near FSSAI red-label threshold.',
   ref:'Apell et al. Biochemistry 2017', badge:'CTT Technology'},

  {id:'fastup',        name:'Fast&Up Reload',               cat:'indian',      na:180,  k:77,   mg:20,  sugar:2.6,  tonic:'Isotonic',  ev:'med',
   use:['daily'], constraints:[],
   origin:'India — Swiss-born brand',
   best:'Light daily hydration, casual athletes, effervescent format convenience.',
   mechanism:'Broad ingredient list with sub-therapeutic doses. Effervescent format aids absorption rate.',
   caveat:'Not effective for endurance, heat, or illness. Doses too low to drive any pathway.',
   ref:'Fast&Up Product Spec Sheet', badge:'Effervescent'},

  {id:'supply6',       name:'Supply6',                      cat:'indian',      na:800,  k:200,  mg:60,  sugar:0,    tonic:'Hypotonic', ev:'med',
   use:['exercise','heat'], constraints:['hypertension'],
   origin:'India DTC',
   best:'High-sweat sports, outdoor work, heat exposure. Highest-sodium Indian DTC.',
   mechanism:'Highest sodium among Indian DTC brands at 800 mg. Zero sugar. Mg present but no B-vitamins or taurine.',
   caveat:'Na:K ratio very high (4:1) may cause relative K deficit in prolonged use.',
   ref:'Supply6 Product Spec Sheet', badge:'High Sodium'},

  {id:'enerzal',       name:'Enerzal',                      cat:'mass',        na:460,  k:390,  mg:50,  sugar:10,   tonic:'Isotonic',  ev:'med',
   use:['exercise','daily'], constraints:[],
   origin:'FDC Ltd, India — food supplement',
   best:'Mid-tier sports drink. Broader minerals than Gatorade. Indian market alternative.',
   mechanism:'Includes Na, K, Mg, Ca for more comprehensive electrolyte coverage than standard sports drinks.',
   caveat:'10g sugar per serving — not for diabetics or as daily product.',
   ref:'FSSAI Pricing Documents 2024', badge:'Indian Market'},

  {id:'gatorade',      name:'Gatorade Thirst Quencher',     cat:'mass',        na:270,  k:75,   mg:0,   sugar:21,   tonic:'Isotonic',  ev:'high',
   use:['exercise'], constraints:['diabetes'],
   origin:'USA — University of Florida, 1965',
   best:'Sports performance >60 min intense exercise. Energy + hydration during activity.',
   mechanism:'Sugar triggers SGLT1 cotransport. 21g sugar per 500 ml provides carbohydrate fuel during sustained effort.',
   caveat:'High sugar contraindicated for diabetics. Not appropriate for desk hydration.',
   ref:'Murray et al. Sports Med Reviews', badge:'Classic Sports'},

  {id:'gatorade-zero', name:'Gatorade Zero',                cat:'mass',        na:270,  k:75,   mg:0,   sugar:0,    tonic:'Isotonic',  ev:'med',
   use:['exercise','daily'], constraints:[],
   origin:'USA — PepsiCo',
   best:'Sugar-free version of Gatorade. Moderate exercise, diabetics.',
   mechanism:'Same Na/K as standard Gatorade but no glucose → no SGLT1 activation → slightly slower absorption.',
   caveat:'No SGLT1 advantage. Not appropriate as ORS substitute.',
   ref:'Gatorade Spec Sheet', badge:'Zero Sugar'},

  {id:'pocari',        name:'Pocari Sweat',                 cat:'mass',        na:200,  k:125,  mg:5,   sugar:30,   tonic:'Isotonic',  ev:'med',
   use:['daily','recovery'], constraints:['diabetes'],
   origin:'Japan — Otsuka Pharmaceutical, 1980',
   best:'Gentle daily rehydration, mild illness recovery, Asian market standard.',
   mechanism:"Designed as a 'drinkable IV drip' — replicates blood plasma electrolyte concentrations.",
   caveat:'30g sugar per 500 ml is high. Not suitable for diabetics or daily over-consumption.',
   ref:'Otsuka Clinical Trials', badge:'Clinical Origin'},

  {id:'powerade',      name:'Powerade',                     cat:'mass',        na:150,  k:35,   mg:5,   sugar:21,   tonic:'Isotonic',  ev:'med',
   use:['exercise'], constraints:['diabetes'],
   origin:'USA — Coca-Cola',
   best:'General sports hydration. Slightly broader electrolyte profile than Gatorade.',
   mechanism:'Includes small amounts of Mg and Ca absent from Gatorade. B-vitamins below performance-relevant doses.',
   caveat:'High sugar content. No demonstrated performance advantage over Gatorade in independent studies.',
   ref:'Powerade Spec Sheet', badge:'Sports Drink'},

  {id:'maurten',       name:'Maurten Drink Mix 320',        cat:'global',      na:800,  k:0,    mg:0,   sugar:80,   tonic:'Isotonic',  ev:'mixed',
   use:['exercise'], constraints:['diabetes'],
   origin:'Sweden — Maurten AB, 2015',
   best:'Marathon, ultra-endurance, high-carb fueling, GI-sensitive runners.',
   mechanism:'Sodium alginate + pectin react with stomach acid → hydrogel encapsulates carbs → reduces GI distress.',
   caveat:'Primary purpose is carbohydrate delivery, NOT electrolytes. 80g sugar contraindicates diabetic use.',
   ref:'Rowe et al. 2021', badge:'Hydrogel Tech'},

  {id:'ringers',       name:"Ringer's Lactate (IV)",        cat:'clinical',    na:3000, k:156,  mg:0,   sugar:0,    tonic:'Isotonic',  ev:'high',
   use:['illness'], constraints:[],
   origin:'Hospital IV — Sydney Ringer 1880s',
   best:'Trauma, surgery, severe dehydration, sepsis. Clinical benchmark for balanced hydration.',
   mechanism:'Balanced crystalloid closest to blood plasma. Lactate metabolised to bicarbonate — corrects metabolic acidosis.',
   caveat:'Hospital use only. Contraindicated in severe liver dysfunction and hyperkalemia.',
   ref:'StatPearls 2023', badge:'Hospital Only'},

  {id:'nss',           name:'Normal Saline 0.9% (IV)',      cat:'clinical',    na:3540, k:0,    mg:0,   sugar:0,    tonic:'Isotonic',  ev:'high',
   use:['illness'], constraints:[],
   origin:'Hospital IV',
   best:'Volume resuscitation, medication dilution. Most widely used IV fluid.',
   mechanism:'154 mEq/L Na + Cl matches plasma osmolality. No K, Mg, Ca, or buffer.',
   caveat:'Large-volume infusion can cause hyperchloremic metabolic acidosis.',
   ref:'SMART Trial NEJM 2018', badge:'Hospital Only'},

  {id:'coconut',       name:'Coconut water (fresh)',        cat:'traditional', na:190,  k:700,  mg:60,  sugar:25,   tonic:'Isotonic',  ev:'med',
   use:['exercise','daily','recovery'], constraints:['ckd','diabetes'],
   origin:'South Asia, coastal India',
   best:'Natural K source. Mild post-exercise hydration. Daily summer use.',
   mechanism:'Highest natural K of any beverage (~700 mg/500 ml). Near-isotonic osmolality (~270 mOsm/L).',
   caveat:'CKD/ACE inhibitor users: high K is dangerous. Diabetes: 25g natural sugar. Fresh > packaged.',
   ref:'PMC3293068, PMC11789751', badge:'Natural'},

  {id:'chaas',         name:'Chaas / Buttermilk (salted)',  cat:'traditional', na:160,  k:370,  mg:20,  sugar:5,    tonic:'Isotonic',  ev:'low',
   use:['daily','heat'], constraints:['lactose'],
   origin:'Pan-India',
   best:'Post-meal digestion, summer coolant, daily summer hydration.',
   mechanism:'Fermented curd + water + salt. Probiotics support gut health. Calcium from milk + added sodium from salt.',
   caveat:'Lactose intolerance excludes use. Sodium content highly variable depending on preparation.',
   ref:'PMC11789751 (J Athl Train 2025)', badge:'Traditional'},

  {id:'nimbu',         name:'Nimbu pani / Shikanji',        cat:'traditional', na:300,  k:60,   mg:5,   sugar:20,   tonic:'Variable',  ev:'low',
   use:['daily','heat'], constraints:['diabetes'],
   origin:'Pan-India summer staple',
   best:'Everyday summer hydration, quick rehydration, low-cost accessible option.',
   mechanism:'Lemon juice + water + salt + sugar + cumin. Sodium from added salt is primary electrolyte. Vitamin C from lemon.',
   caveat:'Preparation variability is key limitation. Sugar content wildly variable.',
   ref:'PMC11789751 (J Athl Train 2025)', badge:'Accessible'},

  {id:'sattu',         name:'Sattu drink (salted)',          cat:'traditional', na:200,  k:324,  mg:80,  sugar:2,    tonic:'Isotonic',  ev:'med',
   use:['daily','heat'], constraints:[],
   origin:'Bihar, Jharkhand, Eastern UP',
   best:'Sustained summer energy. Bihar/UP staple. Pre-workout alternative.',
   mechanism:'Roasted chickpea/gram flour + water + salt + lemon. 20g protein per 100g, high K and Mg.',
   caveat:'Best as functional drink (sustained energy), NOT fast electrolyte replacement for acute dehydration.',
   ref:'PMC9206992', badge:'High Protein'},

  {id:'aam',           name:'Aam panna (raw mango)',         cat:'traditional', na:390,  k:64,   mg:5,   sugar:30,   tonic:'Variable',  ev:'low',
   use:['heat'], constraints:['diabetes'],
   origin:'North/Central India',
   best:'Heatstroke prevention, summer cooling, North India tradition.',
   mechanism:'Raw mango pulp + black salt + cumin + sugar/jaggery. Black salt provides Na + trace minerals.',
   caveat:'30g sugar typical preparation — diabetes contraindication. No standardisation across recipes.',
   ref:'Indian Traditional Foods Survey 2018', badge:'Traditional'},

  {id:'mor',           name:'Mor / Sambharam',              cat:'traditional', na:200,  k:350,  mg:25,  sugar:5,    tonic:'Isotonic',  ev:'low',
   use:['daily','heat'], constraints:['lactose'],
   origin:'Kerala, Tamil Nadu, Karnataka',
   best:'Post-meal South Indian tradition, summer cooling, digestive aid.',
   mechanism:'South Indian buttermilk — thinner, with curry leaves, ginger, green chili, salt. Saltier than North Indian chaas.',
   caveat:'Lactose intolerance excludes use. No direct controlled-trial evidence.',
   ref:'PMC11789751 (J Athl Train 2025)', badge:'South India'},

  {id:'sugarcane',     name:'Sugarcane juice (fresh)',       cat:'traditional', na:30,   k:350,  mg:50,  sugar:50,   tonic:'Hypertonic',ev:'low',
   use:['heat'], constraints:['diabetes','ckd'],
   origin:'Pan-India',
   best:'Quick energy in heat, K supplement, street cooling drink.',
   mechanism:'Very high natural sugar + minerals. K at 300–400 mg per 250 ml.',
   caveat:'CKD risk from high K. Diabetes contraindication. 50g sugar/250 ml. Hygiene variable.',
   ref:'IFCT 2017', badge:'High Sugar'},

  {id:'kanji',         name:'Kanji (fermented)',             cat:'traditional', na:80,   k:200,  mg:10,  sugar:1,    tonic:'Hypotonic', ev:'low',
   use:['daily'], constraints:[],
   origin:'North India',
   best:'Digestive health, mild summer hydration, traditional Ayurvedic.',
   mechanism:'Fermented water from black carrots or rice. Probiotics from fermentation. Mild electrolyte content.',
   caveat:'Limited nutritional documentation. Variable composition.',
   ref:'Ayurvedic Texts', badge:'Probiotic'},

  {id:'water',         name:'Plain water',                   cat:'traditional', na:0,    k:0,    mg:0,   sugar:0,    tonic:'Hypotonic', ev:'high',
   use:['daily'], constraints:[],
   origin:'Baseline reference',
   best:'Baseline hydration. Most situations under 60 minutes of moderate activity.',
   mechanism:'Zero electrolytes = zero osmotic gradient, zero SGLT1 activation, zero ADH retention signal.',
   caveat:'In extreme heat or sustained exercise, plain water alone risks hyponatremia.',
   ref:'Maughan et al. AJCN 2016 (PMID 26702122)', badge:'Baseline'},
];

const SOURCES = [
  { id:'vrijens-1999', type:'paper', year:1999, title:'Sodium-free fluid → plasma Na decline at −2.48 mmol/L/h vs −0.86 with Na', authors:'Vrijens DMJ, Rehrer NJ', journal:'J Appl Physiol', topics:['Sodium','Sweat','Exercise'], url:'https://pubmed.ncbi.nlm.nih.gov/10444630/', used:'Sodium ingredient card; hero stat' },
  { id:'pmc3293068', type:'paper', year:2012, title:'Coconut water vs commercial sports drink — endurance RCT (n=12)', authors:'Kalman DS et al.', journal:'J Int Soc Sports Nutr', topics:['Coconut water','Rehydration','Traditional'], url:'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3293068/', used:'Coconut water product card' },
  { id:'apell-2017', type:'paper', year:2017, title:'Mg²⁺ is obligate cofactor for Na/K-ATPase ATP hydrolysis', authors:'Apell HJ et al.', journal:'Biochemistry', topics:['Magnesium','Na/K-ATPase'], url:'https://pubmed.ncbi.nlm.nih.gov/28877436/', used:'Magnesium ingredient card; Liquid I.V. caveat' },
  { id:'pmc4712861', type:'paper', year:1987, title:'Boron 3mg/day reduced urinary Ca excretion 44% — USDA n=12', authors:'Nielsen FH (USDA)', journal:'FASEB J', topics:['Boron','Mineral retention'], url:'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4712861/', used:'Boron ingredient card; Osmo product card' },
  { id:'pmc4730480', type:'paper', year:2016, title:'82% of Indian workers exposed above WBGT recommendations', authors:'Indian occupational health study', journal:'Int J Occup Environ Health', topics:['India','Heat','WBGT'], url:'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4730480/', used:'India context; hero stat' },
  { id:'pmc7210290', type:'paper', year:2020, title:'SGLT1 mechanism intact in severe rotavirus diarrhea', authors:'Field MJ et al.', journal:'J Clin Invest', topics:['SGLT1','Diarrhea'], url:'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7210290/', used:'WHO ORS mechanism; Electral' },
  { id:'pmc8955583', type:'paper', year:2022, title:'Sodium critical for plasma volume + EAH prevention — systematic review', authors:'Systematic review', journal:'Sports Med', topics:['Sodium','Plasma volume','Hyponatremia'], url:'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8955583/', used:'Sodium ingredient card' },
  { id:'pmc10973985', type:'meta', year:2023, title:'Potassium supplementation and endothelial function — meta-analysis', authors:'Multiple authors', journal:'Nutrients', topics:['Potassium','Cardiovascular'], url:'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10973985/', used:'Potassium ingredient card' },
  { id:'pmc12251314', type:'paper', year:2025, title:'B1 (thiamine) supplementation — anti-fatigue + exercise performance', authors:'Clinical study', journal:'Front Nutr', topics:['B-vitamins','Thiamine','Energy'], url:'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12251314/', used:'B-vitamin science; Osmo product card' },
  { id:'pmc12943169', type:'paper', year:2026, title:'Taurine for heat tolerance — sweat rate +8–15% under heat stress', authors:'Peel J et al.', journal:'J Int Soc Sports Nutr', topics:['Taurine','Heat','Sweat'], url:'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12943169/', used:'Taurine ingredient card; Osmo product card' },
  { id:'pmc3950600', type:'paper', year:2014, title:'Reduced-osmolarity WHO ORS — SGLT1 + ORT historical review', authors:'WHO / Cochrane', journal:'Cochrane Database', topics:['WHO ORS','SGLT1'], url:'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3950600/', used:'WHO ORS; Electral product cards' },
  { id:'maughan-2016', type:'paper', year:2016, title:'Beverage Hydration Index — plain water retains 58% vs electrolyte drinks 74-77%', authors:'Maughan RJ et al.', journal:'Am J Clin Nutr', topics:['Plain water','Retention','BHI'], url:'https://pubmed.ncbi.nlm.nih.gov/26702122/', used:'Hero stat; plain water product card' },
  { id:'baker-2017', type:'paper', year:2017, title:'Sweat sodium variability — 20–80 mmol/L individual range', authors:'Baker LB', journal:'Sports Med', topics:['Sodium','Sweat'], url:'https://pubmed.ncbi.nlm.nih.gov/28332116/', used:'Sodium ingredient card; PH 1500 rationale' },
  { id:'rowlands-2021', type:'meta', year:2021, title:'Gastric emptying meta-analysis — hypotonic superior (28 studies)', authors:'Rowlands DS et al.', journal:'J Appl Physiol', topics:['Gastric emptying','Hypotonic'], url:'https://pubmed.ncbi.nlm.nih.gov/34197241/', used:'Framework A; zero-sugar rationale' },
  { id:'tarsitano-2024', type:'paper', year:2024, title:'Magnesium supplementation reduces muscle soreness', authors:'Tarsitano MG et al.', journal:'J Transl Med', topics:['Magnesium','Recovery'], url:'https://pubmed.ncbi.nlm.nih.gov/38468244/', used:'Magnesium ingredient card' },
  { id:'lancet-gh-2024', type:'paper', year:2024, title:'31% of global population has inadequate Mg intake', authors:'Lancet Global Health', journal:'Lancet Global Health', topics:['Magnesium','Global deficiency'], url:'https://doi.org/10.1016/S2214-109X(24)00265-6', used:'Magnesium ingredient card; hero stat' },
  { id:'peel-2024', type:'paper', year:2024, title:'Taurine supplementation increases sweat rate 8–15% under heat stress', authors:'Peel J et al.', journal:'Eur J Sport Sci', topics:['Taurine','Heat','Sweat'], url:'https://pubmed.ncbi.nlm.nih.gov/38050958/', used:'Taurine ingredient card; Osmo card' },
  { id:'cochrane-zinc-2024', type:'meta', year:2024, title:'Zinc reduces common cold duration — Cochrane review (35 RCTs, n=1,995)', authors:'Cochrane Database', journal:'Cochrane Database Syst Rev', topics:['Zinc','Immune'], url:'https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD001364.pub5/full', used:'Zinc ingredient card' },
  { id:'who-searo-2026', type:'guideline', year:2026, title:'WHO-SEARO: Traditional Indian drinks as adjunct hydration in heat', authors:'WHO South-East Asia Regional Office', journal:'WHO-SEARO', topics:['Traditional','India','Chaas','Nimbu pani'], url:'https://www.who.int/southeastasia', used:'Chaas, nimbu pani, mor product cards' },
  { id:'smart-2018', type:'paper', year:2018, title:'Balanced crystalloids vs normal saline — kidney outcomes (SMART trial)', authors:'Semler MW et al.', journal:'N Engl J Med', topics:["Ringer's",'IV fluids'], url:'https://pubmed.ncbi.nlm.nih.gov/29485926/', used:"Ringer's Lactate; Normal Saline product cards" },
  { id:'who-ors-2005', type:'guideline', year:2005, title:'WHO Reduced-Osmolarity ORS Formula — 75 mmol/L Na + 75 mmol/L glucose', authors:'World Health Organization', journal:'WHO Technical Report', topics:['WHO ORS','Diarrhea'], url:'https://www.who.int/publications/i/item/9789241593175', used:'WHO ORS; Electral product cards' },
  { id:'aap-paeds', type:'guideline', year:2004, title:'AAP Paediatric Diarrhea Rehydration Guidelines', authors:'American Academy of Pediatrics', journal:'Pediatrics', topics:['Pediatrics','ORS'], url:'https://publications.aap.org/pediatrics/article/114/2/507/67792/', used:'Pedialyte product card' },
  { id:'fssai-2025', type:'regulatory', year:2025, title:'FSSAI ban on non-WHO "ORS" labelling — upheld by Delhi HC Nov 2025', authors:'FSSAI / Delhi High Court', journal:'India Regulatory', topics:['FSSAI','ORS','India regulation'], url:'https://www.fssai.gov.in/', used:'Electral, Enerzal product cards; India regulatory context' },
  { id:'fssai-hfss', type:'regulatory', year:2024, title:'FSSAI Front-of-Pack HFSS Warnings (sugar/salt/fat)', authors:'Food Safety and Standards Authority of India', journal:'FSSAI Gazette', topics:['FSSAI','Labelling','HFSS'], url:'https://www.fssai.gov.in/', used:'India regulatory context; Liquid I.V. sugar discussion' },
  { id:'wada', type:'regulatory', year:2024, title:'WADA Batch Testing Standards for Sports Supplements', authors:'World Anti-Doping Agency', journal:'WADA', topics:['Anti-doping','Sports'], url:'https://www.wada-ama.org/', used:'Precision Hydration product cards' },
  { id:'icmr-nnmb', type:'regulatory', year:2020, title:'ICMR/NNMB — Indian RDA + Nutrient Adequacy Survey (70% Indians below 50% Mg RDA)', authors:'ICMR / National Nutrition Monitoring Bureau', journal:'ICMR', topics:['ICMR','India','Deficiency'], url:'https://www.icmr.gov.in/', used:'Mg ingredient card; India context' },
  { id:'mckenna-2021', type:'paper', year:2021, title:'Intracellular K⁺ depletion (~21 mM) during intense exercise', authors:'McKenna MJ', journal:'Sports Med', topics:['Potassium','Exercise'], url:'https://pubmed.ncbi.nlm.nih.gov/33400172/', used:'Potassium ingredient card' },
  { id:'rowe-2021', type:'paper', year:2021, title:'Maurten hydrogel — GI tolerance in runners vs cyclists', authors:'Rowe JT et al.', journal:'Int J Sport Nutr Exerc Metab', topics:['Maurten','Carbs','GI'], url:'https://pubmed.ncbi.nlm.nih.gov/33279870/', used:'Maurten product card' },
  { id:'pmc9206992', type:'paper', year:2022, title:'Sattu standardisation — mineral content + composition study', authors:'Indian standardisation study', journal:'J Food Sci Technol', topics:['Sattu','Traditional'], url:'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9206992/', used:'Sattu product card' },
  { id:'otsuka', type:'industry', year:2020, title:'Otsuka Pharmaceutical Clinical Trials — Pocari Sweat hospital use', authors:'Otsuka Pharmaceutical', journal:'Industry data', topics:['Pocari Sweat','Clinical'], url:'https://www.otsuka.co.jp/', used:'Pocari Sweat product card' },
  { id:'taurine-meta-2025', type:'meta', year:2025, title:'Taurine cognition meta-analysis — 7 RCTs, n=402 (no direct cognitive benefit)', authors:'Int J Food Sci Nutr', journal:'Int J Food Sci Nutr', topics:['Taurine','Cognition'], url:'https://pubmed.ncbi.nlm.nih.gov/', used:'Taurine caveat; Osmo product card caveat' },
  { id:'zinc-aqp', type:'paper', year:2007, title:'Zinc regulates AQP3/AQP7 gene expression (aquaporin trafficking)', authors:'J Gen Physiol', journal:'J Gen Physiol', topics:['Zinc','Aquaporins'], url:'https://pubmed.ncbi.nlm.nih.gov/', used:'Zinc ingredient card' },
];

const INGREDIENTS = [
  { sym:'Na⁺',  name:'Sodium',    color:'#E6F4F4', border:'#B8DFE0', text:'#0D7377',
    stat:'135–145 mEq/L serum',
    role:'Primary extracellular cation. Drives SGLT1 cotransport, plasma volume, and nerve impulse propagation. Without Na, glucose co-transport does not occur.',
    src:'Vrijens & Rehrer 1999 · J Appl Physiol', url:'https://pubmed.ncbi.nlm.nih.gov/10444630/' },
  { sym:'K⁺',   name:'Potassium', color:'#D1FAE5', border:'#6EE7B7', text:'#059669',
    stat:'3.5–5.0 mEq/L serum',
    role:'Intracellular cation. Na/K-ATPase pump moves 3 Na out per K cycle. Depletes ~21 mM during intense exercise, causing muscle fatigue and cramping.',
    src:'McKenna MJ 2021 · Sports Med', url:'https://pubmed.ncbi.nlm.nih.gov/33400172/' },
  { sym:'Mg²⁺', name:'Magnesium', color:'#FEF3C7', border:'#FCD34D', text:'#B45309',
    stat:'0.7–1.0 mmol/L serum',
    role:'Obligate cofactor for Na/K-ATPase ATP hydrolysis. Without Mg, the pump cannot function regardless of Na or K levels. 31% of global population is deficient.',
    src:'Apell 2017 · Biochemistry; Lancet GH 2024', url:'https://pubmed.ncbi.nlm.nih.gov/28877436/' },
  { sym:'Zn',   name:'Zinc',      color:'#F3E8FF', border:'#C4B5FD', text:'#7C3AED',
    stat:'70–150 µg/dL serum',
    role:'Regulates AQP3/AQP7 aquaporin gene expression, enabling cellular water channel trafficking. Also reduces common cold duration (Cochrane 2024, 35 RCTs, n=1,995).',
    src:'J Gen Physiol 2007; Cochrane 2024', url:'https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD001364.pub5/full' },
  { sym:'B',    name:'Boron',     color:'#FFF7ED', border:'#FED7AA', text:'#C2410C',
    stat:'3 mg/day effective dose',
    role:'3 mg/day reduces urinary Ca excretion by 44% and Mg excretion significantly. Supports renal mineral retention pathway. Unique to Osmo among Indian DTC brands.',
    src:'PMC4712861 · USDA Nielsen 1987', url:'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4712861/' },
  { sym:'Tau',  name:'Taurine',   color:'#EFF6FF', border:'#BFDBFE', text:'#1D4ED8',
    stat:'1–3 g therapeutic range',
    role:'Organic osmolyte that stabilises cell volume under heat stress. Increases sweat rate 8–15% under heat. Does NOT directly improve cognition — benefit is from preventing dehydration.',
    src:'PMC12943169 2026; 2025 Int J Food Sci Nutr', url:'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12943169/' },
];

const USECASES = [
  { id:'exercise',  icon:'🏃', label:'Exercise & Performance',
    title:'During exercise >60 min you need active sodium replacement.',
    body:'Electrolyte drinks with 300–750 mg Na per serving. Avoid plain water alone — it dilutes plasma sodium without replacing sweat losses.',
    prods:['ph1000','lmnt','osmo'] },
  { id:'heat',      icon:'☀️', label:'Heat & Summer Work',
    title:'Heat work demands high-sodium, high-frequency intake.',
    body:'At WBGT >28°C, sweat losses can exceed 2 L/hr. You need 500–1000 mg Na+ per litre consumed. Traditional nimbu pani with added salt works too.',
    prods:['lmnt','supply6','osmo'] },
  { id:'illness',   icon:'🤒', label:'Fever & Illness',
    title:'Fever + vomiting is an acute electrolyte emergency.',
    body:'Use WHO ORS formula (75 mmol/L Na, 75 mmol/L glucose). SGLT1 cotransport remains intact even with severely damaged intestinal villi.',
    prods:['who-ors','electral','pedialyte'] },
  { id:'daily',     icon:'💻', label:'Daily & Office',
    title:'Daily hydration is about consistency over quantity.',
    body:'Low-sodium electrolytes (100–300 mg Na). No sugar needed for desk use. Avoid ORS products as a daily drink — designed for illness only.',
    prods:['nuun','fastup','osmo'] },
  { id:'endurance', icon:'🚴', label:'Endurance Athletes',
    title:'Long sessions require personalised sodium strategy.',
    body:'Sweat sodium varies 20–80 mmol/L between individuals (Baker 2017). Heavy sweaters need 750–1500 mg Na per session.',
    prods:['ph1500','lmnt','ph1000'] },
  { id:'recovery',  icon:'💊', label:'Hangover & Recovery',
    title:'Alcohol causes osmotic diuresis — Na, K, and Mg all depleted.',
    body:'Rehydrate with balanced electrolytes including K and Mg. WHO ORS or Electral for rapid recovery.',
    prods:['electral','pocari','coconut'] },
  { id:'keto',      icon:'⚖️', label:'Keto & Low-Carb',
    title:'Ketosis triggers insulin-driven sodium wasting.',
    body:'You excrete significantly more Na and K on keto. Supplement aggressively with zero-sugar electrolytes.',
    prods:['lmnt','osmo','supply6'] },
  { id:'paeds',     icon:'👶', label:'Children & Paediatric',
    title:'Children need lower-sodium ORS to avoid hypernatremia.',
    body:'Pedialyte uses 45 mEq/L Na vs WHO 75 mEq/L, reducing hypernatremia risk. AAP-recommended for paediatric rehydration.',
    prods:['pedialyte','who-ors','electral'] },
];

// Helper: get product by id
function getProd(id) { return PRODUCTS.find(p => p.id === id); }

// Helper: chat redirect
function doChat() {
  const el = document.getElementById('chatInput');
  if (!el) return;
  const q = el.value.trim();
  if (!q) return;
  window.open('https://atulyadav405-beep.github.io/hydration-reference/?q=' + encodeURIComponent(q), '_blank');
  el.value = '';
}

// Helper: mobile nav toggle
function initNav() {
  const burger = document.getElementById('navBurger');
  const menu   = document.getElementById('navMobile');
  if (!burger || !menu) return;
  burger.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    burger.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  // Close on link click
  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      menu.classList.remove('open');
      burger.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}
