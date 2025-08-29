export default function Price({ cents, currency='EUR' }:{cents:number; currency?:'EUR'|'USD'|'GBP'}) {
  const value = (cents/100).toLocaleString('fr-FR', { style:'currency', currency })
  return <span>{value}</span>
}
