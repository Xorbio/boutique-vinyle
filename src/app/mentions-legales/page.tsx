export const metadata = {
  title: 'Mentions légales – Atelier Vinyle',
  description: "Informations légales de l’éditeur du site, hébergeur et responsabilité.",
}

export default function MentionsLegales() {
  return (
    <div className="py-10 prose prose-gray max-w-3xl">
      <h1>Mentions légales</h1>

      <h2>Éditeur du site</h2>
      <p>
        Atelier Vinyle<br />
        Statut: Auto-entrepreneur / Association / Société (à préciser)<br />
        Siège social: [Votre adresse]<br />
        Contact: <a href="mailto:tom.sala69340@gmail.com">tom.sala69340@gmail.com</a><br />
        Site: <Link href="/">boutique-vinyle.vercel.app</Link>
      </p>

      <h2>Directeur·rice de la publication</h2>
      <p>
        [Nom et prénom du responsable de publication]
      </p>

      <h2>Hébergement</h2>
      <p>
        Vercel Inc.<br />
        Site: <a href="https://vercel.com" target="_blank" rel="noreferrer">vercel.com</a><br />
        Support: <a href="https://vercel.com/support" target="_blank" rel="noreferrer">vercel.com/support</a>
      </p>

      <h2>Propriété intellectuelle</h2>
      <p>
        L’ensemble des contenus (textes, images, graphismes, logos, marques, etc.) présents sur ce site
        sont la propriété de leurs titulaires respectifs. Toute reproduction, représentation, modification ou
        exploitation, totale ou partielle, est interdite sans autorisation préalable.
      </p>

      <h2>Responsabilité</h2>
      <p>
        Atelier Vinyle s’efforce d’assurer l’exactitude et la mise à jour des informations diffusées.
        Toutefois, aucune garantie n’est donnée et la responsabilité de l’éditeur ne saurait être engagée en cas
        d’erreur ou d’omission. Les liens externes n’engagent pas la responsabilité de l’éditeur.
      </p>

      <h2>Données personnelles</h2>
      <p>
        Pour plus d’informations sur les traitements de données et vos droits, consultez notre
        <Link href="/confidentialite"> politique de confidentialité</Link>.
      </p>

      <h2>Contact</h2>
      <p>
        Pour toute question, vous pouvez nous écrire à <a href="mailto:tom.sala69340@gmail.com">tom.sala69340@gmail.com</a>.
      </p>
    </div>
  )
}
import Link from 'next/link'
