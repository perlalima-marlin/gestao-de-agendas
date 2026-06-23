import { IndicadoresDashboard } from "./IndicadoresDashboard"

const LOCAIS_MAP: Record<string, string> = {
  "unidade-centro": "Unidade Centro",
  "unidade-norte": "Unidade Norte",
  "viva-melhor": "Viva Melhor",
}

export default async function IndicadoresPage({
  params,
}: {
  params: Promise<{ local: string }>
}) {
  const { local } = await params
  const nomeLocal = LOCAIS_MAP[local] ?? local

  return <IndicadoresDashboard localId={local} nomeLocal={nomeLocal} />
}
