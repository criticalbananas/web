import { ArrowRight, ExternalLink, Fingerprint, Shield, Wallet, Zap } from 'lucide-react';
import Link from 'next/link';

import BananaScene from '@/components/common/banana-scene';
import { Button } from '@/components/ui/button';

import CountdownTimer from './_components/CountdownTimer';

export default function Home() {
	return (
		<>
			{/* Hero Section */}
			<section className="relative ml-14 grid min-h-screen grid-cols-12 pt-14">
				{/* 3D Logo Scene */}
				<div className="border-border relative col-span-5 border-r">
					<div className="sticky top-14 h-[calc(100vh-3.5rem)]">
						<BananaScene />
						<div className="absolute right-6 bottom-6 left-6 z-10">
							<p className="text-muted-foreground mb-1 font-mono text-[10px] tracking-[0.25em]">SYMBOL / 01</p>
							<p className="text-foreground/60 text-xs">The Critical Banana. Your ticket to the arena.</p>
						</div>
					</div>
				</div>

				{/* Content Column */}
				<div className="col-span-7 flex flex-col">
					<div className="border-border flex flex-1 flex-col justify-center border-b px-10 py-20">
						<div className="mb-6">
							<span className="text-muted-foreground font-mono text-[10px] tracking-[0.3em]">
								BNB SMART CHAIN / ARENA PROTOCOL
							</span>
						</div>
						<h1 className="mb-6 font-[family-name:var(--font-heading)] text-6xl leading-[0.85] font-bold tracking-tight lg:text-7xl xl:text-8xl">
							<span className="block">LIQUIDATE</span>
							<span className="text-primary block">THE CROWD.</span>
						</h1>
						<p className="text-muted-foreground mb-10 max-w-lg font-mono text-base leading-relaxed">
							1,000 Traders. 3 Lanes. 5 Minutes. Survival is a skill. The most crowded lane gets crushed — don{"'"}t be
							in it.
						</p>
						<div className="flex items-center gap-4">
							<Button
								size="lg"
								className="bg-primary text-primary-foreground hover:bg-accent h-12 gap-2 px-8 font-mono text-xs tracking-[0.15em]"
							>
								JOIN ACTIVE LOBBY
								<ArrowRight className="h-4 w-4" />
							</Button>
							<Button
								variant="outline"
								size="lg"
								className="h-12 gap-2 bg-transparent px-8 font-mono text-xs tracking-[0.15em]"
							>
								VIEW CONTRACT AUDIT
								<ExternalLink className="h-3 w-3" />
							</Button>
						</div>
					</div>

					{/* Live Data Ribbon */}
					<div className="border-border grid grid-cols-4 border-b">
						{[
							{ value: '12', label: 'ACTIVE LOBBIES', pulse: true },
							{ value: '14.5k', label: 'BNB PAID OUT', unit: 'BNB' },
							{ value: 'COUNTDOWN', label: 'NEXT CRUSH IN', isTimer: true },
							{ value: '10%', label: 'COMMISSION', sub: 'FLAT' },
						].map((stat, i) => (
							<div key={i} className="border-border group hover:bg-card border-r p-5 transition-colors last:border-r-0">
								<div className="mb-1 flex items-center gap-2">
									{stat.pulse && <span className="bg-primary h-1.5 w-1.5 animate-pulse rounded-full" />}
									<p className="text-foreground font-[family-name:var(--font-heading)] text-2xl font-bold">
										{stat.isTimer ? <CountdownTimer /> : stat.value}
									</p>
									{stat.unit && <span className="text-primary font-mono text-[10px]">{stat.unit}</span>}
									{stat.sub && <span className="text-muted-foreground font-mono text-[10px]">{stat.sub}</span>}
								</div>
								<p className="text-muted-foreground font-mono text-[10px] tracking-[0.2em]">{stat.label}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Rules of the Arena */}
			<section id="rules" className="border-border ml-14 border-b">
				<div className="grid grid-cols-12">
					<div className="border-border col-span-3 flex min-h-[500px] flex-col justify-between border-r p-8">
						<div>
							<p className="text-muted-foreground mb-3 font-mono text-[10px] tracking-[0.3em]">MECHANISM</p>
							<h2 className="font-[family-name:var(--font-heading)] text-4xl leading-[0.9] font-bold lg:text-5xl">
								<span className="block">RULES</span>
								<span className="block">OF THE</span>
								<span className="text-primary block">ARENA</span>
							</h2>
						</div>
						<p className="text-muted-foreground font-mono text-xs leading-relaxed">
							No luck. No RNG. Pure game theory and crowd psychology.
						</p>
					</div>
					<div className="col-span-9">
						<div className="grid h-full grid-cols-2 grid-rows-2">
							{[
								{
									step: '01',
									title: 'CHOOSE YOUR LANE',
									desc: 'Enter with 0.01 BNB. Pick Banana, Coin, or Diamond. Each lane is a bet against the crowd.',
									kanji: '道',
								},
								{
									step: '02',
									title: 'WATCH THE HEATMAP',
									desc: 'Real-time data shows you where the liquidity is flowing. Other players are visible. Information is your weapon.',
									kanji: '熱',
								},
								{
									step: '03',
									title: 'DODGE THE CRUSH',
									desc: 'Every 60 seconds, the math logic targets the lane with the highest volume. IF LaneVolume > 40% THEN Crush.',
									kanji: '避',
								},
								{
									step: '04',
									title: 'INSTANT SETTLEMENT',
									desc: 'Last standing? The prize pool hits your wallet in <1 second. Smart contract execution. No intermediaries.',
									kanji: '金',
								},
							].map((mode, i) => (
								<div
									key={i}
									className="border-border group hover:bg-card relative overflow-hidden border-r border-b p-8 transition-colors last:border-r-0 [&:nth-child(2)]:border-r-0 [&:nth-child(3)]:border-b-0 [&:nth-child(4)]:border-b-0"
								>
									<span className="text-border/20 pointer-events-none absolute -right-6 -bottom-10 text-[180px] leading-none font-bold select-none">
										{mode.kanji}
									</span>
									<div className="relative z-10">
										<p className="text-primary mb-3 font-mono text-[10px] tracking-[0.3em]">STEP {mode.step}</p>
										<h3 className="mb-3 font-[family-name:var(--font-heading)] text-xl font-bold tracking-wide">
											{mode.title}
										</h3>
										<p className="text-muted-foreground text-sm leading-relaxed">{mode.desc}</p>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* Proof of Fairness */}
			<section id="proof" className="border-border ml-14 border-b">
				<div className="grid grid-cols-12">
					<div className="border-border col-span-5 flex min-h-[500px] flex-col justify-center border-r p-10">
						<p className="text-muted-foreground mb-4 font-mono text-[10px] tracking-[0.3em]">THE TERMINAL LOGIC</p>
						<h2 className="mb-6 font-[family-name:var(--font-heading)] text-5xl leading-[0.85] font-bold lg:text-6xl">
							<span className="block">DETERMI&shy;</span>
							<span className="block">NISTIC.</span>
							<span className="text-primary block">NOT</span>
							<span className="text-primary block">RANDOM.</span>
						</h2>
						<p className="text-muted-foreground mb-8 text-sm leading-relaxed">
							Critical Bananas uses zero RNG. Our logic is a transparent math engine. No AI black boxes. No house edge.
							Just player vs. player psychology.
						</p>
						<Button variant="outline" className="w-fit gap-2 bg-transparent font-mono text-[10px] tracking-[0.15em]">
							VIEW ON BSCSCAN
							<ExternalLink className="h-3 w-3" />
						</Button>
					</div>

					{/* Code Block */}
					<div className="bg-card col-span-7 flex flex-col justify-center p-10">
						<p className="text-muted-foreground mb-4 font-mono text-[10px] tracking-[0.3em]">
							TOURNAMENT.SOL / PAYWINNERS()
						</p>
						<pre className="overflow-x-auto font-mono text-sm leading-relaxed">
							<code>
								<span className="text-muted-foreground">{'// Deterministic crush logic'}</span>
								{'\n'}
								<span className="text-primary">function</span> <span className="text-foreground">payWinners</span>
								{'() '}
								<span className="text-muted-foreground">{'{'}</span>
								{'\n'}
								{'  '}
								<span className="text-primary">uint256</span>
								{' laneA = '}
								<span className="text-primary">getLaneVolume</span>
								{'(0);'}
								{'\n'}
								{'  '}
								<span className="text-primary">uint256</span>
								{' laneB = '}
								<span className="text-primary">getLaneVolume</span>
								{'(1);'}
								{'\n'}
								{'  '}
								<span className="text-primary">uint256</span>
								{' laneC = '}
								<span className="text-primary">getLaneVolume</span>
								{'(2);'}
								{'\n'}
								{'  '}
								<span className="text-primary">uint256</span>
								{' total = laneA + laneB + laneC;'}
								{'\n'}
								{'\n'}
								{'  '}
								<span className="text-muted-foreground">{'// The most crowded lane gets crushed'}</span>
								{'\n'}
								{'  '}
								<span className="text-primary">if</span>
								{' (laneA * 100 / total > 40) '}
								<span className="text-muted-foreground">{'{'}</span>
								{'\n'}
								{'    '}
								<span className="text-primary">crushLane</span>
								{'(0);'}
								{'\n'}
								{'    '}
								<span className="text-primary">distributePrize</span>
								{'(1, 2);'}
								{'\n'}
								{'  '}
								<span className="text-muted-foreground">{'}'}</span>
								{'\n'}
								{'\n'}
								{'  '}
								<span className="text-muted-foreground">{'// Winners receive instantly'}</span>
								{'\n'}
								{'  '}
								<span className="text-primary">for</span>
								{' ('}
								<span className="text-primary">uint</span>
								{' i = 0; i < survivors; i++) '}
								<span className="text-muted-foreground">{'{'}</span>
								{'\n'}
								{'    '}
								<span className="text-primary">payable</span>
								{'(winner[i]).'}
								<span className="text-primary">transfer</span>
								{'(share);'}
								{'\n'}
								{'  '}
								<span className="text-muted-foreground">{'}'}</span>
								{'\n'}
								<span className="text-muted-foreground">{'}'}</span>
							</code>
						</pre>
					</div>
				</div>
			</section>

			{/* Built for Performance */}
			<section id="specs" className="border-border ml-14 border-b">
				<div className="grid grid-cols-12">
					<div className="border-border col-span-2 border-r p-8">
						<p className="text-muted-foreground rotate-180 font-mono text-[10px] tracking-[0.25em] [writing-mode:vertical-lr]">
							PERFORMANCE
						</p>
					</div>
					<div className="col-span-10">
						<div className="grid grid-cols-3">
							{[
								{
									icon: <Fingerprint className="h-5 w-5" />,
									title: 'PASSKEY LOGIN',
									desc: 'No seed phrases. No extensions. Sign in with FaceID or TouchID and start playing in seconds.',
									stat: '0 CLICKS',
									statLabel: 'TO AUTHENTICATE',
								},
								{
									icon: <Zap className="h-5 w-5" />,
									title: 'SUB-SECOND SPEED',
									desc: 'Built on BNB Smart Chain. Your moves are recorded in 450ms. Settlement is instant.',
									stat: '450ms',
									statLabel: 'BLOCK CONFIRMATION',
								},
								{
									icon: <Shield className="h-5 w-5" />,
									title: 'NON-CUSTODIAL',
									desc: 'We never touch your keys. The Smart Contract handles the money. You handle the strategy.',
									stat: '100%',
									statLabel: 'YOUR CUSTODY',
								},
							].map((feat, i) => (
								<div
									key={i}
									className="border-border hover:bg-card group flex min-h-[350px] flex-col justify-between border-r p-8 transition-colors last:border-r-0"
								>
									<div>
										<div className="border-border text-primary group-hover:border-primary/40 mb-6 flex h-10 w-10 items-center justify-center border transition-colors">
											{feat.icon}
										</div>
										<h3 className="mb-3 font-[family-name:var(--font-heading)] text-lg font-bold tracking-wide">
											{feat.title}
										</h3>
										<p className="text-muted-foreground text-sm leading-relaxed">{feat.desc}</p>
									</div>
									<div className="border-border mt-8 border-t pt-6">
										<p className="text-primary font-[family-name:var(--font-heading)] text-3xl font-bold">
											{feat.stat}
										</p>
										<p className="text-muted-foreground mt-1 font-mono text-[10px] tracking-[0.2em]">
											{feat.statLabel}
										</p>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* CTA */}
			<section className="border-border ml-14 border-b">
				<div className="grid min-h-[350px] grid-cols-12">
					<div className="border-border col-span-8 flex flex-col justify-center border-r p-10">
						<p className="text-muted-foreground mb-3 font-mono text-[10px] tracking-[0.3em]">ENTER THE ARENA</p>
						<h2 className="mb-8 font-[family-name:var(--font-heading)] text-4xl leading-[0.9] font-bold lg:text-5xl">
							The crowd is already
							<br />
							moving. <span className="text-primary">Pick your lane.</span>
						</h2>
						<div className="flex items-center gap-4">
							<Button
								size="lg"
								className="bg-primary text-primary-foreground hover:bg-accent h-12 gap-2 px-8 font-mono text-xs tracking-[0.15em]"
							>
								<Wallet className="h-4 w-4" />
								CONNECT WALLET
							</Button>
							<Button
								variant="outline"
								size="lg"
								className="h-12 gap-2 bg-transparent px-8 font-mono text-xs tracking-[0.15em]"
							>
								JOIN TELEGRAM
							</Button>
						</div>
					</div>
					<div className="col-span-4 flex flex-col">
						{[
							{ label: 'Twitter / X', handle: '@criticalbananas' },
							{ label: 'Telegram', handle: 't.me/criticalbananas' },
							{ label: 'Discord', handle: 'discord.gg/bananas' },
						].map((social, i) => (
							<Link
								key={i}
								href="#"
								className="border-border hover:bg-card group flex flex-1 items-center justify-between border-b p-5 transition-colors last:border-b-0"
							>
								<div>
									<p className="text-muted-foreground mb-0.5 font-mono text-[10px] tracking-[0.2em]">{social.label}</p>
									<p className="font-mono text-sm">{social.handle}</p>
								</div>
								<ArrowRight className="text-muted-foreground group-hover:text-primary h-4 w-4 transition-all group-hover:translate-x-1" />
							</Link>
						))}
					</div>
				</div>
			</section>
		</>
	);
}
