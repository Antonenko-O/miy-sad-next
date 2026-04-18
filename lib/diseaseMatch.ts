// Maps disease text fragments (from plant.diseases field) to disease IDs in diseases.json

const DISEASE_KEYWORDS: { id: string; keywords: string[] }[] = [
  { id: 'boroshnysta-rosa',    keywords: ['борошниста роса'] },
  { id: 'chorna-plyamystist',  keywords: ['чорна плямистість'] },
  { id: 'sira-hnyl',           keywords: ['сіра гниль', 'ботритис'] },
  { id: 'irza',                keywords: ['іржа'] },
  { id: 'vohnyanyy-opik',      keywords: ['вогняний опік'] },
  { id: 'popelytsia',          keywords: ['попелиця'] },
  { id: 'pavutynnyy-klishch',  keywords: ['павутинний кліщ'] },
  { id: 'tryps',               keywords: ['трипси', 'трипс'] },
  { id: 'slymaky',             keywords: ['слимак', 'равлик'] },
  { id: 'khruschi-lychynky',   keywords: ['хрущ'] },
  { id: 'fitoftora',           keywords: ['фітофтора'] },
  { id: 'monilioz',            keywords: ['монільоз', 'монілія', 'моніліальний'] },
  { id: 'parsha',              keywords: ['парша'] },
  { id: 'kliasterosp',         keywords: ['клястероспоріоз', 'дірчаста плямистість'] },
  { id: 'shutte',              keywords: ['шютте'] },
  { id: 'vertytsiloz',         keywords: ['вертіцільоз', 'вілт'] },
  { id: 'antraknoze',          keywords: ['антракноз'] },
  { id: 'fusarioz',            keywords: ['фузаріоз'] },
  { id: 'virusna-mozaika',     keywords: ['вірусна мозаїка', 'мозаїка'] },
  { id: 'koreneva-hnyl',       keywords: ['коренева гниль'] },
  { id: 'kucheryavist-lystya', keywords: ['кучерявість листя', 'кучерявість'] },
  { id: 'kokomikoz',           keywords: ['кокомікоз'] },
  { id: 'mildyu',              keywords: ['мілдью', 'несправжня борошниста роса', 'пероноспороз'] },
  { id: 'khloroz',             keywords: ['хлороз'] },
  { id: 'bakterioz',           keywords: ['бактеріоз'] },
  { id: 'malynovy-zhuk',       keywords: ['малиновий жук'] },
  { id: 'samshytova-vohnivka', keywords: ['самшитова вогнівка', 'вогнівка'] },
  { id: 'septorioz',           keywords: ['септоріоз'] },
];

export interface DiseasePart {
  text: string;
  diseaseId: string | null; // null = not in our DB, show as plain text
}

/** Parses plant.diseases string into parts — linked and plain text */
export function parseDiseases(raw: string | null | undefined): DiseasePart[] {
  if (!raw || raw === 'null') return [];

  // Split on comma, standalone "та" / "і" (not part of a word like "Борошниста")
  const parts = raw.split(/,|(?<=\s)та(?=\s)|(?<=\s)і(?=\s)/).map((s) => s.trim()).filter(Boolean);

  return parts.map((part) => {
    const lower = part.toLowerCase();
    const match = DISEASE_KEYWORDS.find((d) =>
      d.keywords.some((kw) => lower.includes(kw.toLowerCase()))
    );
    return { text: part, diseaseId: match?.id ?? null };
  });
}
