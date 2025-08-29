export default function Contact() {
  return (
    <div className="py-10 max-w-xl">
      <h1 className="text-3xl font-semibold mb-6">Contact</h1>
      <p className="text-gray-700 mb-6">
        Une question, une commande sur mesure ? Écris-nous.
      </p>
      <form action="https://formspree.io/f/yourid" method="POST" className="space-y-4">
        <input name="name" placeholder="Votre nom" className="w-full rounded-lg border p-3" />
        <input type="email" name="email" placeholder="Votre email" className="w-full rounded-lg border p-3" required />
        <textarea name="message" placeholder="Message" rows={5} className="w-full rounded-lg border p-3" required />
        <button className="rounded-xl bg-black text-white px-5 py-3">Envoyer</button>
      </form>
      {/* Remplace par ton outil de formulaire favori (Formspree, Basin, etc.) */}
    </div>
  )
}
