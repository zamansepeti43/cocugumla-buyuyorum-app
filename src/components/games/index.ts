import type { ActivityInteractionId } from '../../types/models'
import { AdvancedMemoryGame } from './AdvancedMemoryGame'
import { AttentionSpotGame } from './AttentionSpotGame'
import { BalloonTrack } from './BalloonTrack'
import { BoxOpeningGame } from './BoxOpeningGame'
import { CandyMatchGame } from './CandyMatchGame'
import { ColorMatchGame } from './ColorMatchGame'
import { ComplexPuzzleGame } from './ComplexPuzzleGame'
import { ContrastTrack } from './ContrastTrack'
import { DragSortGame } from './DragSortGame'
import { ForestDiscoveryGame } from './ForestDiscoveryGame'
import { LogicGridGame } from './LogicGridGame'
import { MemoryGridGame } from './MemoryGridGame'
import { MiniTetrisGame } from './MiniTetrisGame'
import { MissingShapeGame } from './MissingShapeGame'
import { MotionTrackGame } from './MotionTrackGame'
import { MovingShapeGame } from './MovingShapeGame'
import { PatternCompleteGame } from './PatternCompleteGame'
import { PictureMatchGame } from './PictureMatchGame'
import { ReactionTargetGame } from './ReactionTargetGame'
import { SequenceMemoryGame } from './SequenceMemoryGame'
import { ShapePuzzleGame } from './ShapePuzzleGame'
import { SizePickerGame } from './SizePickerGame'
import { SortingGame } from './SortingGame'
import { SoundCueGame } from './SoundCueGame'
import { SoundObjectGame } from './SoundObjectGame'
import { StrategyMazeGame } from './StrategyMazeGame'
import { StrategyPlanGame } from './StrategyPlanGame'
import { TouchAndSee } from './TouchAndSee'
import { TwinMatchGame } from './TwinMatchGame'
import { WordPickGame } from './WordPickGame'

export { AdvancedMemoryGame } from './AdvancedMemoryGame'
export { AnimalFinderGame } from './AnimalFinderGame'
export { AttentionSpotGame } from './AttentionSpotGame'
export { BalloonTrack } from './BalloonTrack'
export { BoxOpeningGame } from './BoxOpeningGame'
export { CandyMatchGame } from './CandyMatchGame'
export { ChoiceGame } from './ChoiceGame'
export { ColorMatchGame } from './ColorMatchGame'
export { ComplexPuzzleGame } from './ComplexPuzzleGame'
export { ContrastTrack } from './ContrastTrack'
export { DragSortGame } from './DragSortGame'
export { ForestDiscoveryGame } from './ForestDiscoveryGame'
export { GameShell } from './GameShell'
export { LogicGridGame } from './LogicGridGame'
export { MemoryGridGame } from './MemoryGridGame'
export { MiniTetrisGame } from './MiniTetrisGame'
export { MissingShapeGame } from './MissingShapeGame'
export { MotionTrackGame } from './MotionTrackGame'
export { MovingShapeGame } from './MovingShapeGame'
export { PatternCompleteGame } from './PatternCompleteGame'
export { PictureMatchGame } from './PictureMatchGame'
export { ReactionTargetGame } from './ReactionTargetGame'
export { SequenceMemoryGame } from './SequenceMemoryGame'
export { ShapePuzzleGame } from './ShapePuzzleGame'
export { SizePickerGame } from './SizePickerGame'
export { SortingGame } from './SortingGame'
export { SoundCueGame } from './SoundCueGame'
export { SoundObjectGame } from './SoundObjectGame'
export { StrategyMazeGame } from './StrategyMazeGame'
export { StrategyPlanGame } from './StrategyPlanGame'
export { TouchAndSee } from './TouchAndSee'
export { TwinMatchGame } from './TwinMatchGame'
export { WordPickGame } from './WordPickGame'

export const gameTitles: Partial<Record<ActivityInteractionId, string>> = {
  'contrast-track': 'Kontrast Takibi',
  'balloon-track': 'Balonu Takip Et',
  'touch-and-see': 'Dokun ve Gör',
  'sorting-game': 'Dokun ve Sırala',
  'color-match-mini': 'Doğru Rengi Bul',
  'missing-shape': 'Doğru Şekli Bul',
  'animal-finder': 'Ormanda Hayvanları Keşfet',
  'motion-track': 'Hareketli Şekli Takip Et',
  'size-picker': 'Büyük-Küçük Seç',
  'twin-match': 'Aynısını Bul',
  'sound-object': 'Sesli Nesneyi Bul',
  'moving-shape': 'Hareket Edeni Yakala',
  'sound-cue': 'Sesli İpucu',
  'drag-sort': 'Taşıma Yarışı',
  'picture-match': 'Resim Eşleştir',
  'pattern-complete': 'Örüntüyü Tamamla',
  'memory-grid': 'Hafıza Izgarası',
  'shape-puzzle': 'Şekil Yerleştir',
  'word-pick': 'Kelimeyi Bul',
  'logic-grid': 'Mantık Izgarası',
  'attention-spot': 'Hedefi Bul',
  'sequence-memory': 'Sıra Hafızası',
  'mini-tetris': 'Mini Tetris',
  'candy-match': 'Şeker Eşleştir',
  'reaction-target': 'Refleks Hedefi',
  'strategy-plan': 'Strateji Planı',
  'strategy-maze': 'Strateji Labirenti',
  'complex-puzzle': 'Zorlu Bulmaca',
  'advanced-memory': 'İleri Hafıza',
  'box-opening': 'Kapağı Aç',
}

export const gameRenderers: Partial<Record<ActivityInteractionId, React.ComponentType<Record<string, unknown>>>> = {
  'contrast-track': ContrastTrack,
  'balloon-track': BalloonTrack,
  'touch-and-see': TouchAndSee,
  'sorting-game': SortingGame,
  'color-match-mini': ColorMatchGame,
  'missing-shape': MissingShapeGame,
  'animal-finder': ForestDiscoveryGame,
  'motion-track': MotionTrackGame,
  'size-picker': SizePickerGame,
  'twin-match': TwinMatchGame,
  'sound-object': SoundObjectGame,
  'moving-shape': MovingShapeGame,
  'sound-cue': SoundCueGame,
  'drag-sort': DragSortGame,
  'picture-match': PictureMatchGame,
  'pattern-complete': PatternCompleteGame,
  'memory-grid': MemoryGridGame,
  'shape-puzzle': ShapePuzzleGame,
  'word-pick': WordPickGame,
  'logic-grid': LogicGridGame,
  'attention-spot': AttentionSpotGame,
  'sequence-memory': SequenceMemoryGame,
  'mini-tetris': MiniTetrisGame,
  'candy-match': CandyMatchGame,
  'reaction-target': ReactionTargetGame,
  'strategy-plan': StrategyPlanGame,
  'strategy-maze': StrategyMazeGame,
  'complex-puzzle': ComplexPuzzleGame,
  'advanced-memory': AdvancedMemoryGame,
  'box-opening': BoxOpeningGame,
}
