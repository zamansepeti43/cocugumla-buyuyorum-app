# Animasyon Sistemi

Çocuğumla Büyüyorum'un animasyonlu içerik katmanı Rive runtime üzerine kuruluyor.

## İlk kaynak adayı

**Kid Character Animation — muh.iswarramadhan**
- Rive Marketplace: https://rive.app/marketplace/21142-40026-kid-character-animation/
- Lisans: CC BY
- İçerik: Walk, Run, Idle

Bu asset uygulamaya dahil edilmeden önce dosyanın kendisi indirilmeli ve CC BY atfı proje içinde korunmalıdır. Rive runtime kodu ise MIT lisanslıdır.

## Kullanım

`InteractiveRiveAnimation` bileşeni `.riv` dosyasını yükler ve state machine çalıştırabilir.

Örnek:

```tsx
<InteractiveRiveAnimation
  src="/animations/characters/child-character.riv"
  stateMachines="Idle"
  title="Sevimli karakter"
/>
```

Sonraki aşamada bu katmanı Doğa Dünyası, Hayvanlar ve Hikâye içeriklerine bağlayacağız.
