export function Footer() {
  return (
    <footer className="border-t border-border py-6 mt-8">
      <div className="max-w-lg mx-auto px-4 text-center space-y-2">
        <p className="text-sm font-bold text-foreground">IEV Volleyball Training</p>
        <p className="text-xs text-muted-foreground">
          SESI Albino Marques Gomes
        </p>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Criado por João Vitor Santanna Soares, Thomaz Porfirio de Oliveira, Lucca Stuart Zanotto e Ricardo da Silva Bittencourt
        </p>
        <a
          href="https://instagram.com/iev_sesi"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-bold text-accent hover:underline"
        >
          @iev_sesi
        </a>
      </div>
    </footer>
  );
}
