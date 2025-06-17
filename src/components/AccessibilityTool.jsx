import { useState } from 'react';
import { useTranslation } from "react-i18next";
import '../assets/css/accessibility.css'; // Asegúrate de tener estilos para la accesibilidad
import AccessibilityIcon from '../assets/img/accessibility.svg';

export default function AccessibilityTool() {
    const { t, i18n } = useTranslation();
    const [fontSize, setFontSize] = useState(16);
    const [menuOpen, setMenuOpen] = useState(false);
    const [reading, setReading] = useState(false);
    const [isHighContrast, setIsHighContrast] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isUnderlineLinks, setIsUnderlineLinks] = useState(false);
    const [isDyslexiaFont, setIsDyslexiaFont] = useState(false);

    // Cambia el tamaño de fuente
    const changeFontSize = (size) => {
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
            mainContent.style.fontSize = `${size}px`;
            setFontSize(size);
        }
    };

    // Contraste alto
    const toggleContrast = () => {
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
            mainContent.classList.toggle('high-contrast');
            setIsHighContrast(!isHighContrast);
        }
    };

    // Modo oscuro
    const toggleDarkMode = () => {
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
            mainContent.classList.toggle('dark-mode');
            setIsDarkMode(!isDarkMode);
        }
    };

    // Subrayado de enlaces
    const toggleUnderlineLinks = () => {
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
            mainContent.classList.toggle('underline-links');
            setIsUnderlineLinks(!isUnderlineLinks);
        }
    };

    // Fuente dislexia
    const toggleDyslexiaFont = () => {
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
            mainContent.classList.toggle('dyslexia-font');
            setIsDyslexiaFont(!isDyslexiaFont);
        }
    };

    // Leer texto principal
    const readText = () => {
        const mainContent = document.getElementById('main-content');
        if (mainContent && mainContent.innerText.trim()) {
            window.speechSynthesis.cancel();
            const speech = new window.SpeechSynthesisUtterance();
            speech.text = mainContent.innerText;
            speech.lang = i18n.language === "en" ? "en-US" : "es-ES";
            setReading(true);
            speech.onend = () => setReading(false);
            window.speechSynthesis.speak(speech);
        } else {
            alert(t("noContentToRead") || "No se encontró contenido para leer.");
        }
    };

    // Pausar/continuar lectura
    const pauseOrResume = () => {
        if (window.speechSynthesis.speaking) {
            if (window.speechSynthesis.paused) {
                window.speechSynthesis.resume();
            } else {
                window.speechSynthesis.pause();
            }
        }
    };

    // Detener lectura
    const stopReading = () => {
        window.speechSynthesis.cancel();
        setReading(false);
    };

    // Restablecer todo
    const resetAccessibility = () => {
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
            mainContent.style.fontSize = '16px';
            setFontSize(16);
            mainContent.classList.remove('high-contrast', 'dark-mode', 'underline-links', 'dyslexia-font');
            stopReading();
            setIsHighContrast(false);
            setIsDarkMode(false);
            setIsUnderlineLinks(false);
            setIsDyslexiaFont(false);
        }
    };

    const openWhatsApp = () => {
        window.open('https://wa.me/542266123456', '_blank');
    };

    return (
        <div className="floating-buttons">
            <button 
                className="whatsapp-button" 
                onClick={openWhatsApp}
                aria-label="Contactar por WhatsApp"
            >
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
            </button>

            <div className="accessibility-sticky" role="region" aria-label={t("menuAcc")}>
                <button
                    className="accessibility-trigger"
                    aria-label={menuOpen ? t("cerrarMenu") : t("abrirMenu")}
                    aria-expanded={menuOpen}
                    aria-controls="accessibility-menu"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <img src={AccessibilityIcon} alt={t("menuAcc")} width="30" />
                </button>

                {menuOpen && (
                    <div
                        className="accessibility-menu"
                        id="accessibility-menu"
                        role="menu"
                        tabIndex={-1}
                    >
                        <button onClick={() => changeFontSize(fontSize + 2)} aria-label={t("aumentar")} role="menuitem">A+</button>
                        <button onClick={() => changeFontSize(fontSize - 2)} aria-label={t("disminuir")} role="menuitem">A-</button>
                        <button onClick={toggleContrast} aria-label={t("contraste")} role="menuitem">{t("contraste")}</button>
                        <button onClick={toggleDarkMode} aria-label={t("oscuro")} role="menuitem">{t("oscuro")}</button>
                        <button onClick={toggleUnderlineLinks} aria-label={t("subrayarEnlaces") || "Subrayar enlaces"} role="menuitem">{t("subrayarEnlaces") || "Subrayar enlaces"}</button>
                        <button onClick={toggleDyslexiaFont} aria-label={t("fuenteDislexia") || "Fuente dislexia"} role="menuitem">{t("fuenteDislexia") || "Fuente dislexia"}</button>
                        <button onClick={readText} aria-label={t("leer")} role="menuitem" disabled={reading}>{t("leer")}</button>
                        <button onClick={pauseOrResume} aria-label={t("pausarContinuar") || "Pausar/Continuar"} role="menuitem">{t("pausarContinuar") || "Pausar/Continuar"}</button>
                        <button onClick={stopReading} aria-label={t("detenerLectura") || "Detener lectura"} role="menuitem">{t("detenerLectura") || "Detener lectura"}</button>
                        <button onClick={resetAccessibility} aria-label={t("reset")} role="menuitem">{t("reset")}</button>
                    </div>
                )}
            </div>
        </div>
    );
}