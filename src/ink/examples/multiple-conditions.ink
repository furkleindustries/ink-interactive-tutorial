VAR count = 0
VAR bored_of_paris = false

-> start

=== start ===
* { not visit_paris } [Go to Paris] -> visit_paris
+ { visit_paris } { not bored_of_paris }
  [Return to Paris] -> visit_paris

=== visit_paris ===
~ count += 1

{count > 3:
  ~ bored_of_paris = true
}

{bored_of_paris:
  Ugh! Paris again!
- else:
  Paris! What's not to love about it!
}

-> start
