require('dotenv').config();
const fakeRequest = require('supertest');
const app = require('../lib/app');
const { execSync } = require('child_process');
const pool = require('../lib/utils/pool');

describe('app routes', () => {
  beforeAll(() => {
    execSync('npm run setup-db');
  });

  afterAll((done) => {
    return pool.end(done);
  });

  it('returns all quotes', async () => {
    const allQuotes = [
      {
        quote: "I've made a huge mistake",
        saidBy: 'Gob',
      },
      {
        quote: "I don't understand the question, and I won't respond to it",
        saidBy: 'Lucille',
      },
      {
        quote:
          "I want to cry so bad, but I don't think I can spare the moisture.",
        saidBy: 'Lucille',
      },
      {
        quote: 'Marry  me!',
        saidBy: 'Maeby',
      },
      {
        quote: "I'm a MONSTER!",
        saidBy: 'Buster',
      },
      {
        quote:
          'You must teach me, George Michael. You must teach me the ways of the secular flesh.',
        saidBy: 'Ann',
      },
      {
        quote: 'Say goodbye to THESE!',
        saidBy: 'Kitty',
      },
      {
        quote: 'Steve Holt!',
        saidBy: 'Steve Holt',
      },
      {
        quote: 'Annyong!',
        saidBy: 'Annyong',
      },
      {
        quote:
          'Oh it’s so cute. She sometimes takes a little pack of mayonnaise and she’ll squirt it in her mouth all over and then she’ll take an egg and kind of mmm mmm. She calls it a mayonegg.',
        saidBy: 'George Michael',
      },
      {
        quote: 'Excuse me, do these effectively hide my thunder?',
        saidBy: 'Tobias',
      },
      {
        quote:
          "The Mere Fact That You Call Making Love 'Pop-Pop' Tells Me You’re Not Ready",
        saidBy: 'Michael',
      },
      {
        quote: "It's as Ann as the nose on plain's face",
        saidBy: 'Michael',
      },
      {
        quote: 'Her?',
        saidBy: 'George',
      },
      {
        quote: 'Way to plant Ann!',
        saidBy: 'George Michael',
      },
      {
        quote:
          "I'm sure that Egg is a very nice person. I just don't want you spending all your money getting her all glittered up for Easter.",
        saidBy: 'Michael',
      },
      {
        quote:
          "I love all my children equally...[Earlier that day...] I don't care for Gob",
        saidBy: 'Lucille',
      },
      {
        quote: 'I wonder how I can talk you out of ever making that face again',
        saidBy: 'Michael',
      },
      {
        quote: "I'm afraid I just blue myself",
        saidBy: 'Tobias',
      },
      {
        quote:
          "I prematurely shot my wad on what was supposed to be a dry run so now I'm afraid I have something of a mess on my hands.",
        saidBy: 'Tobias',
      },
      {
        quote: "OH MY GOD THEY'RE HAVING A FIRE...Sale.",
        saidBy: 'Tobias',
      },
      {
        quote: "Oh, Mercy Me! I Keep Forgetting I'm In The Colonies!",
        saidBy: 'Tobias',
      },
      {
        quote:
          'Okay, Lindsay, Are You Forgetting That I Was A Professional Twice-Over? An Analyst And A Therapist. An Analrapist.',
        saidBy: 'Tobias',
      },
      {
        quote: 'I mean it’s one banana Michael, what could it cost, $10?',
        saidBy: 'Lucille',
      },
      {
        quote: 'Here’s some money. Go see a Star War.',
        saidBy: 'Lucille',
      },
      {
        quote:
          'Everything they do is so dramatic and flamboyant, it just makes me wanna set myself on fire.',
        saidBy: 'Lucille',
      },
      {
        quote: 'Well I’d rather be dead in California than alive in Arizona.',
        saidBy: 'Lucille',
      },
      {
        quote: 'She thinks I’m too critical. That’s another fault of hers.',
        saidBy: 'Lucille',
      },
      {
        quote: 'Suddenly he’s too much of a big shot to brush Mother’s hair.',
        saidBy: 'Lucille',
      },
      {
        quote:
          'She’d love to get at me any way she could. That’s why she’s been flirting with Gob. She’s trying to prove that she’s closer to my children than I am, but the joke’s on her, because she doesn’t know how little I care for Gob',
        saidBy: 'Lucille',
      },
      {
        quote: 'Yes I was flying, but a little too close to the sun.',
        saidBy: 'Buster',
      },
      {
        quote: 'Suddenly playing with yourself is a scholarly pursuit.',
        saidBy: 'Lucille',
      },
      {
        quote:
          'He’s a beautiful boy. They don’t appreciate him. It’s his glasses. They make him look like a lizard. Plus he’s self-conscious.',
        saidBy: 'Lucille',
      },
      {
        quote:
          'If that’s a veiled criticism about me, I won’t hear it and I won’t respond to it.',
        saidBy: 'Lucille',
      },
      {
        quote:
          'You’re Telling Me There’s No Alcohol? What The Hell Are We Supposed To Do For Two Days?',
        saidBy: 'Lucille',
      },
      {
        quote:
          "Why can't you be more like Buster? He put himself in a coma to protect this family.",
        saidBy: 'George',
      },
      {
        quote:
          'How dare you? I oughta shave your head and make you sit under that camera all night, mister.',
        saidBy: 'George',
      },
      {
        quote: 'Never promise crazy a baby',
        saidBy: 'George',
      },
      {
        quote:
          "These are dangerous people, Michael. They will do whatever it takes to get inside this family and bring us down....Oh, they're polite and the men all sound gay, but they will rip out your heart. And their breath...",
        saidBy: 'George',
      },
      {
        quote:
          "I wine 'em and dine 'em, but I don't let them tell me what to do. (speaking to his dolls, arranged for a tea party) I don't let them tell me what to do.",
        saidBy: 'George',
      },
      {
        quote:
          'If you play me, you got to play me like a man and not like some mincing little Polly or Nellie! I get those names confused. Apology. (to dolls) Apologies all around.',
        saidBy: 'George',
      },
      {
        quote:
          "I'm going crazy with the boredom, Michael. At least in prison, we had knife fights and we had movie night and once, both. Those men did not enjoy Soapdish.",
        saidBy: 'George',
      },
      {
        quote: "Well, of course, you're gonna get hop-ons.",
        saidBy: 'George',
      },
      {
        quote:
          "Oh, that is just great. Now, I'm expected to climb back on top of Kitty and do my thing again. I mean, this family runs into problems and it's 'Oh, let's have Gob (bleep) our way out of it.'",
        saidBy: 'Gob',
      },
      {
        quote:
          "You were ... you were just a turd out there, you know? You couldn't kick, and you couldn't run, you know? You were just a turd.",
        saidBy: 'George',
      },
      {
        quote: "You don't fire crazy. You never fire crazy.",
        saidBy: 'George',
      },
      {
        quote: 'No touching!',
        saidBy: 'George',
      },
      {
        quote: "And that's why you always leave a note.",
        saidBy: 'J. Walter Weatherman',
      },
      {
        quote: "And thats why you don't yell.",
        saidBy: 'J. Walter Weatherman',
      },
      {
        quote: "And thats why you don't teach lessons to your son.",
        saidBy: 'J. Walter Weatherman',
      },
      {
        quote: "And thats why you don't teach your father a lesson.",
        saidBy: 'J. Walter Weatherman',
      },
      {
        quote: 'Never promise crazy a baby.',
        saidBy: 'George',
      },
      {
        quote: 'Daddy horny, Michael',
        saidBy: 'George',
      },
      {
        quote: 'There absolutely will be a margarita in my mouth!',
        saidBy: 'Kitty',
      },
      {
        quote:
          'Please refrain from discussing or engaging in any sort of inter-office (bleep) or (bleep -ing), or finger (bleep) or (bleep-sting) or (bleep-esting) or even (bleeping), even though so many people in this office are begging for it.',
        saidBy: 'Gob',
      },
      {
        quote:
          'Is that George Michael’s girlfriend? What, is she funny or something?',
        saidBy: 'Gob',
      },
      {
        quote:
          'She’s not ‘that’ Mexican, mom, she’s my Mexican. And she’s Colombian or something.',
        saidBy: 'Gob',
      },
      {
        quote: 'I hear the jury’s still out on science.',
        saidBy: 'Gob',
      },
      {
        quote: 'Why go to a banana stand when we can make your banana stand?',
        saidBy: 'Gob',
      },
      {
        quote:
          'Yeah, the guy in the $3,000 suit is holding the elevator for the guy who doesn’t make that in four months. Come On!',
        saidBy: 'Gob',
      },
      {
        quote: 'Come on!',
        saidBy: 'Gob',
      },
      {
        quote:
          'Illusion, Michael. A trick is something a whore does for money… (to kids) or cocaine.',
        saidBy: 'Gob',
      },
      {
        quote: 'Taste the happy, Michael! Taste it!',
        saidBy: 'Gob',
      },
      {
        quote: 'You taste these tears! You taste my sad, Michael!',
        saidBy: 'Gob',
      },
      {
        quote:
          '(about love) I know what an erection feels like, Michael. No, it’s the opposite. It’s like my heart is getting hard.',
        saidBy: 'Gob',
      },
      {
        quote: "We do a quick vote and it's Ciao, Fathero.",
        saidBy: 'George Michael',
      },
      {
        quote:
          '(Opening a present) Quicken Premier! Dad, I hope you kept the receipt.',
        saidBy: 'George Michael',
      },
      {
        quote: "Don't you see? I drugged him not to go all the way with him.",
        saidBy: 'Maeby',
      },
      {
        quote:
          "(about Franklin) I just don't want him to point out my cracker ass in front of Ann.",
        saidBy: 'George Michael',
      },
      {
        quote:
          "I had another hearing. I think I'm going to get off. I have a good lawyer.",
        saidBy: 'Barry',
      },
      {
        quote: 'Does this look contagious to you?',
        saidBy: 'Barry',
      },
      {
        quote:
          'The will is at my office. Next to the hot plate with the frayed wires.',
        saidBy: 'Barry',
      },
      {
        quote: "You can control your bladder when you're dead.",
        saidBy: 'Steve Holt',
      },
      {
        quote: "Don't ask 'Can I?' Ask 'I can.'",
        saidBy: 'Steve Holt',
      },
      {
        quote:
          "You don't have to worry so much. I mean, obviously your dad doesn't want to spend time with you, but, you know, go to the beach or whatever.",
        saidBy: 'Maeby',
      },
      {
        quote: "There's always money in the banana stand",
        saidBy: 'George',
      },
    ];
    const data = await fakeRequest(app)
      .get('/quotes')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(data.body).toEqual(allQuotes);
  });

  it('returns all quotes for one character by character name', async () => {
    const data = await fakeRequest(app)
      .get('/quotes/Lucille')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(data.body).toEqual(expect.any(Array));
  });

  it('returns all quotes by search query', async () => {
    const data = await fakeRequest(app)
      .get('/quotes/search/Banana')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(data.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          quote: 'I mean it’s one banana Michael, what could it cost, $10?',
          saidBy: 'Lucille',
        }),
      ])
    );
  });

  it('returns a random quote', async () => {
    const data = await fakeRequest(app)
      .get('/quotes/random')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(data.body).toEqual(expect.any(Object));
  });
});
