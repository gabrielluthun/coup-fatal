import { useEffect } from 'react';
import { useGameStore } from '../store/gameStore';

/** Ignore les frappes émises depuis un champ de saisie ou un élément éditable. */
function isEditableTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return true;
  return target.isContentEditable;
}

/**
 * Raccourcis clavier pour l'écran de jeu :
 * - Espace : action principale (Lancer le chrono / Bonne réponse selon contexte)
 * - X      : Mauvaise réponse (uniquement chrono en cours)
 * - S      : Changer de joueur (uniquement chrono à l'arrêt)
 * - Échap  : Retour au menu (uniquement chrono à l'arrêt)
 */
export function useGameShortcuts() {
  const status        = useGameStore((s) => s.status);
  const timerRunning  = useGameStore((s) => s.timerRunning);
  const startTimer    = useGameStore((s) => s.startTimer);
  const correctAnswer = useGameStore((s) => s.correctAnswer);
  const wrongAnswer   = useGameStore((s) => s.wrongAnswer);
  const switchPlayer  = useGameStore((s) => s.switchPlayer);
  const resetGame     = useGameStore((s) => s.resetGame);

  useEffect(() => {
    if (status !== 'playing') return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.repeat) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (isEditableTarget(e.target)) return;

      const key = e.key.toLowerCase();

      if (e.code === 'Space' || e.key === ' ') {
        e.preventDefault();
        if (timerRunning) correctAnswer();
        else startTimer();
        return;
      }

      if (key === 'x' && timerRunning) {
        e.preventDefault();
        wrongAnswer();
        return;
      }

      if (key === 's' && !timerRunning) {
        e.preventDefault();
        switchPlayer();
        return;
      }

      if (key === 'escape' && !timerRunning) {
        e.preventDefault();
        resetGame();
        return;
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [status, timerRunning, startTimer, correctAnswer, wrongAnswer, switchPlayer, resetGame]);
}
