# EmailJS Setup Guide für Draftnex Solutions

## Schritt-für-Schritt Anleitung

### 1. EmailJS Account erstellen

1. Gehe zu [EmailJS](https://www.emailjs.com/)
2. Klicke auf "Sign Up" und erstelle einen kostenlosen Account
3. Bestätige deine E-Mail-Adresse

### 2. Email Service hinzufügen

1. Gehe zu [Email Services](https://dashboard.emailjs.com/admin)
2. Klicke auf "Add New Service"
3. Wähle deinen E-Mail-Provider (z.B. Gmail, Outlook, etc.)
4. Folge den Anweisungen zur Authentifizierung
5. **Notiere dir die SERVICE_ID** (z.B. "service_abc123")

### 3. Email Template erstellen

1. Gehe zu [Email Templates](https://dashboard.emailjs.com/admin/templates)
2. Klicke auf "Create New Template"
3. Verwende diese Template-Variablen:

```
Von: {{from_name}} ({{from_email}})

Nachricht:
{{message}}

---
Diese Nachricht wurde über das Kontaktformular auf draftnex-solutions.de gesendet.
```

4. Stelle sicher, dass folgende Variablen im Template vorhanden sind:
   - `{{from_name}}` - Name des Absenders
   - `{{from_email}}` - E-Mail des Absenders
   - `{{message}}` - Nachricht

5. **Notiere dir die TEMPLATE_ID** (z.B. "template_xyz789")

### 4. Public Key abrufen

1. Gehe zu [Account](https://dashboard.emailjs.com/admin/account)
2. Kopiere deinen **Public Key** (z.B. "abcd1234efgh5678")

### 5. Keys in contact.html eintragen

Öffne `contact.html` und ersetze die Platzhalter:

```javascript
// Zeile 430
emailjs.init('YOUR_PUBLIC_KEY');  // ← Ersetze mit deinem Public Key

// Zeile 463
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData)
//           ↑                  ↑
//      Service ID        Template ID
```

**Beispiel:**
```javascript
emailjs.init('abcd1234efgh5678');

emailjs.send('service_abc123', 'template_xyz789', formData)
```

### 6. Testen

1. Öffne die Website lokal oder auf GitHub Pages
2. Gehe zur Kontaktseite
3. Fülle das Formular aus und sende eine Test-Nachricht
4. Prüfe dein E-Mail-Postfach

## Wichtige Hinweise

### Sicherheit
- Der Public Key ist öffentlich sichtbar (das ist OK!)
- EmailJS schützt deine E-Mail-Adresse vor Spam
- Das Honeypot-Feld schützt vor Bots

### Kostenlose Version
- 200 E-Mails pro Monat kostenlos
- Für mehr Traffic: Upgrade auf bezahlten Plan

### Spam-Schutz
Das Formular enthält mehrere Schutzmaßnahmen:
1. **Honeypot Field** - Verstecktes Feld, das Bots ausfüllen
2. **EmailJS Rate Limiting** - Automatisch von EmailJS
3. **Client-Side Validation** - Required-Felder

## Troubleshooting

### "EmailJS is not defined"
→ Stelle sicher, dass das EmailJS SDK geladen wird:
```html
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>
```

### E-Mails kommen nicht an
1. Prüfe die Service-ID und Template-ID
2. Prüfe den Public Key
3. Schaue in die Browser-Konsole (F12) für Fehlermeldungen
4. Prüfe den Spam-Ordner
5. Stelle sicher, dass der Service in EmailJS aktiv ist

### "Failed to send email"
→ Öffne die Browser-Konsole (F12) und schaue nach dem genauen Fehler
→ Häufigste Ursachen:
- Falsche Service-ID oder Template-ID
- Service wurde in EmailJS deaktiviert
- Monatliches Limit erreicht

## Alternative ohne EmailJS

Falls du EmailJS nicht verwenden möchtest, kannst du:

1. **Formspree.io** verwenden (ähnlich wie EmailJS)
2. **Netlify Forms** (wenn du auf Netlify hostest)
3. **Backend API** erstellen (Node.js, PHP, etc.)
4. **Mailto-Link** behalten (funktioniert, aber öffnet Mail-Client)

## Support

Bei Fragen:
- [EmailJS Dokumentation](https://www.emailjs.com/docs/)
- [EmailJS Support](https://www.emailjs.com/docs/faq/)

---

**Erstellt:** 2025-12-09
**Für:** Draftnex Solutions Kontaktformular
