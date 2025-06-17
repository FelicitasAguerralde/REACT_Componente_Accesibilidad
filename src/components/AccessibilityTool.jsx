import { useState } from 'react';
import { useTranslation } from "react-i18next";
import '../assets/css/accessibility.css'; // Asegúrate de tener estilos para la accesibilidad
import AccessibilityIcon from '../assets/img/accessibility.svg';

export default function AccessibilityTool() {
    const { t, i18n } = useTranslation();
    const [fontSize, setFontSize] = useState(16);
    const [menuOpen, setMenuOpen] = useState(false);
    const [reading, setReading] = useState(false);

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
        }
    };

    // Modo oscuro
    const toggleDarkMode = () => {
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
            mainContent.classList.toggle('dark-mode');
        }
    };

    // Subrayado de enlaces
    const toggleUnderlineLinks = () => {
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
            mainContent.classList.toggle('underline-links');
        }
    };

    // Fuente dislexia
    const toggleDyslexiaFont = () => {
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
            mainContent.classList.toggle('dyslexia-font');
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
        }
    };

    return (
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
    );
}