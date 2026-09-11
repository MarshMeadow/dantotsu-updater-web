import { createContext, useContext, useEffect, useMemo, useState } from 'react'

export const LANGUAGES = [
  { code: 'en', name: 'English', dir: 'ltr' },
  { code: 'es', name: 'Español', dir: 'ltr' },
  { code: 'fr', name: 'Français', dir: 'ltr' },
  { code: 'de', name: 'Deutsch', dir: 'ltr' },
  { code: 'pt', name: 'Português', dir: 'ltr' },
  { code: 'ru', name: 'Русский', dir: 'ltr' },
  { code: 'ja', name: '日本語', dir: 'ltr' },
  { code: 'zh', name: '中文', dir: 'ltr' },
  { code: 'hi', name: 'हिन्दी', dir: 'ltr' },
  { code: 'ar', name: 'العربية', dir: 'rtl' },
] as const

export type LangCode = (typeof LANGUAGES)[number]['code']

type Dict = Record<string, string>

const en: Dict = {
  'nav.home': 'Home',
  'nav.archive': 'Archive',
  'nav.obtainium': 'Obtainium',
  'nav.resources': 'Resources',
  'nav.community': 'Community',
  'nav.settings': 'Settings',
  'footer.history': 'History',
  'footer.contributors': 'Contributors',
  'footer.obtainiumGuide': 'Obtainium Guide',
  'footer.sitemap': 'Sitemap',
  'footer.extensions': 'Extensions',
  'footer.legal': 'DMCA / Legal',
  'footer.privacy': 'Privacy',
  'footer.terms': 'Terms',
  'search.label': 'Search',
  'search.placeholder': 'Search pages, guides, topics…',
  'search.noResults': 'No results found',
  'search.hint': 'to navigate, Enter to open, Esc to close',
  'a11y.openMenu': 'Open menu',
  'a11y.closeMenu': 'Close menu',
  'a11y.language': 'Language',
}

const es: Dict = {
  'nav.home': 'Inicio',
  'nav.archive': 'Archivo',
  'nav.obtainium': 'Obtainium',
  'nav.resources': 'Recursos',
  'nav.community': 'Comunidad',
  'nav.settings': 'Ajustes',
  'footer.history': 'Historia',
  'footer.contributors': 'Colaboradores',
  'footer.obtainiumGuide': 'Guía de Obtainium',
  'footer.sitemap': 'Mapa del sitio',
  'footer.extensions': 'Extensiones',
  'footer.legal': 'DMCA / Legal',
  'footer.privacy': 'Privacidad',
  'footer.terms': 'Términos',
  'search.label': 'Buscar',
  'search.placeholder': 'Buscar páginas, guías, temas…',
  'search.noResults': 'Sin resultados',
  'search.hint': 'para navegar, Enter para abrir, Esc para cerrar',
  'a11y.openMenu': 'Abrir menú',
  'a11y.closeMenu': 'Cerrar menú',
  'a11y.language': 'Idioma',
}

const fr: Dict = {
  'nav.home': 'Accueil',
  'nav.archive': 'Archives',
  'nav.obtainium': 'Obtainium',
  'nav.resources': 'Ressources',
  'nav.community': 'Communauté',
  'nav.settings': 'Paramètres',
  'footer.history': 'Histoire',
  'footer.contributors': 'Contributeurs',
  'footer.obtainiumGuide': 'Guide Obtainium',
  'footer.sitemap': 'Plan du site',
  'footer.extensions': 'Extensions',
  'footer.legal': 'DMCA / Mentions légales',
  'footer.privacy': 'Confidentialité',
  'footer.terms': 'Conditions',
  'search.label': 'Rechercher',
  'search.placeholder': 'Rechercher des pages, guides, sujets…',
  'search.noResults': 'Aucun résultat',
  'search.hint': 'pour naviguer, Entrée pour ouvrir, Échap pour fermer',
  'a11y.openMenu': 'Ouvrir le menu',
  'a11y.closeMenu': 'Fermer le menu',
  'a11y.language': 'Langue',
}

const de: Dict = {
  'nav.home': 'Start',
  'nav.archive': 'Archiv',
  'nav.obtainium': 'Obtainium',
  'nav.resources': 'Ressourcen',
  'nav.community': 'Community',
  'nav.settings': 'Einstellungen',
  'footer.history': 'Geschichte',
  'footer.contributors': 'Mitwirkende',
  'footer.obtainiumGuide': 'Obtainium-Anleitung',
  'footer.sitemap': 'Sitemap',
  'footer.extensions': 'Erweiterungen',
  'footer.legal': 'DMCA / Rechtliches',
  'footer.privacy': 'Datenschutz',
  'footer.terms': 'Nutzungsbedingungen',
  'search.label': 'Suchen',
  'search.placeholder': 'Seiten, Anleitungen, Themen suchen…',
  'search.noResults': 'Keine Ergebnisse',
  'search.hint': 'zum Navigieren, Enter zum Öffnen, Esc zum Schließen',
  'a11y.openMenu': 'Menü öffnen',
  'a11y.closeMenu': 'Menü schließen',
  'a11y.language': 'Sprache',
}

const pt: Dict = {
  'nav.home': 'Início',
  'nav.archive': 'Arquivo',
  'nav.obtainium': 'Obtainium',
  'nav.resources': 'Recursos',
  'nav.community': 'Comunidade',
  'nav.settings': 'Configurações',
  'footer.history': 'História',
  'footer.contributors': 'Contribuidores',
  'footer.obtainiumGuide': 'Guia do Obtainium',
  'footer.sitemap': 'Mapa do site',
  'footer.extensions': 'Extensões',
  'footer.legal': 'DMCA / Legal',
  'footer.privacy': 'Privacidade',
  'footer.terms': 'Termos',
  'search.label': 'Pesquisar',
  'search.placeholder': 'Pesquisar páginas, guias, tópicos…',
  'search.noResults': 'Sem resultados',
  'search.hint': 'para navegar, Enter para abrir, Esc para fechar',
  'a11y.openMenu': 'Abrir menu',
  'a11y.closeMenu': 'Fechar menu',
  'a11y.language': 'Idioma',
}

const ru: Dict = {
  'nav.home': 'Главная',
  'nav.archive': 'Архив',
  'nav.obtainium': 'Obtainium',
  'nav.resources': 'Ресурсы',
  'nav.community': 'Сообщество',
  'nav.settings': 'Настройки',
  'footer.history': 'История',
  'footer.contributors': 'Участники',
  'footer.obtainiumGuide': 'Руководство Obtainium',
  'footer.sitemap': 'Карта сайта',
  'footer.extensions': 'Расширения',
  'footer.legal': 'DMCA / Правовая информация',
  'footer.privacy': 'Конфиденциальность',
  'footer.terms': 'Условия',
  'search.label': 'Поиск',
  'search.placeholder': 'Поиск страниц, руководств, тем…',
  'search.noResults': 'Ничего не найдено',
  'search.hint': 'для навигации, Enter — открыть, Esc — закрыть',
  'a11y.openMenu': 'Открыть меню',
  'a11y.closeMenu': 'Закрыть меню',
  'a11y.language': 'Язык',
}

const ja: Dict = {
  'nav.home': 'ホーム',
  'nav.archive': 'アーカイブ',
  'nav.obtainium': 'Obtainium',
  'nav.resources': 'リソース',
  'nav.community': 'コミュニティ',
  'nav.settings': '設定',
  'footer.history': '歴史',
  'footer.contributors': 'コントリビューター',
  'footer.obtainiumGuide': 'Obtainiumガイド',
  'footer.sitemap': 'サイトマップ',
  'footer.extensions': '拡張機能',
  'footer.legal': 'DMCA / 法務',
  'footer.privacy': 'プライバシー',
  'footer.terms': '利用規約',
  'search.label': '検索',
  'search.placeholder': 'ページ・ガイド・トピックを検索…',
  'search.noResults': '結果が見つかりません',
  'search.hint': 'で移動、Enterで開く、Escで閉じる',
  'a11y.openMenu': 'メニューを開く',
  'a11y.closeMenu': 'メニューを閉じる',
  'a11y.language': '言語',
}

const zh: Dict = {
  'nav.home': '首页',
  'nav.archive': '存档',
  'nav.obtainium': 'Obtainium',
  'nav.resources': '资源',
  'nav.community': '社区',
  'nav.settings': '设置',
  'footer.history': '历史',
  'footer.contributors': '贡献者',
  'footer.obtainiumGuide': 'Obtainium 指南',
  'footer.sitemap': '网站地图',
  'footer.extensions': '扩展',
  'footer.legal': 'DMCA / 法律',
  'footer.privacy': '隐私',
  'footer.terms': '条款',
  'search.label': '搜索',
  'search.placeholder': '搜索页面、指南、主题…',
  'search.noResults': '未找到结果',
  'search.hint': '导航，Enter 打开，Esc 关闭',
  'a11y.openMenu': '打开菜单',
  'a11y.closeMenu': '关闭菜单',
  'a11y.language': '语言',
}

const hi: Dict = {
  'nav.home': 'होम',
  'nav.archive': 'संग्रह',
  'nav.obtainium': 'Obtainium',
  'nav.resources': 'संसाधन',
  'nav.community': 'समुदाय',
  'nav.settings': 'सेटिंग्स',
  'footer.history': 'इतिहास',
  'footer.contributors': 'योगदानकर्ता',
  'footer.obtainiumGuide': 'Obtainium गाइड',
  'footer.sitemap': 'साइटमैप',
  'footer.extensions': 'एक्सटेंशन',
  'footer.legal': 'DMCA / कानूनी',
  'footer.privacy': 'गोपनीयता',
  'footer.terms': 'शर्तें',
  'search.label': 'खोजें',
  'search.placeholder': 'पेज, गाइड, विषय खोजें…',
  'search.noResults': 'कोई परिणाम नहीं मिला',
  'search.hint': 'नेविगेट करें, Enter खोलें, Esc बंद करें',
  'a11y.openMenu': 'मेनू खोलें',
  'a11y.closeMenu': 'मेनू बंद करें',
  'a11y.language': 'भाषा',
}

const ar: Dict = {
  'nav.home': 'الرئيسية',
  'nav.archive': 'الأرشيف',
  'nav.obtainium': 'Obtainium',
  'nav.resources': 'الموارد',
  'nav.community': 'المجتمع',
  'nav.settings': 'الإعدادات',
  'footer.history': 'التاريخ',
  'footer.contributors': 'المساهمون',
  'footer.obtainiumGuide': 'دليل Obtainium',
  'footer.sitemap': 'خريطة الموقع',
  'footer.extensions': 'الإضافات',
  'footer.legal': 'DMCA / قانوني',
  'footer.privacy': 'الخصوصية',
  'footer.terms': 'الشروط',
  'search.label': 'بحث',
  'search.placeholder': 'ابحث في الصفحات والأدلة والمواضيع…',
  'search.noResults': 'لا توجد نتائج',
  'search.hint': 'للتنقل، Enter للفتح، Esc للإغلاق',
  'a11y.openMenu': 'فتح القائمة',
  'a11y.closeMenu': 'إغلاق القائمة',
  'a11y.language': 'اللغة',
}

const DICTS: Record<LangCode, Dict> = { en, es, fr, de, pt, ru, ja, zh, hi, ar }

const STORAGE_KEY = 'dantotsu-lang'

function detectLang(): LangCode {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved && saved in DICTS) return saved as LangCode
  } catch {
    /* storage unavailable */
  }
  const nav = navigator.language?.toLowerCase() ?? 'en'
  const base = nav.split('-')[0]
  if (base in DICTS) return base as LangCode
  return 'en'
}

interface I18nValue {
  lang: LangCode
  dir: 'ltr' | 'rtl'
  setLang: (code: LangCode) => void
  t: (key: string) => string
}

const I18nContext = createContext<I18nValue>({
  lang: 'en',
  dir: 'ltr',
  setLang: () => {},
  t: (key) => en[key] ?? key,
})

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<LangCode>(detectLang)

  const dir = LANGUAGES.find((l) => l.code === lang)?.dir ?? 'ltr'

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = dir
    try {
      localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      /* storage unavailable */
    }
  }, [lang, dir])

  const value = useMemo<I18nValue>(
    () => ({
      lang,
      dir,
      setLang: setLangState,
      t: (key: string) => DICTS[lang][key] ?? en[key] ?? key,
    }),
    [lang, dir],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  return useContext(I18nContext)
}
