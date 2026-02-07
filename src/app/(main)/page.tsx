import Link from 'next/link';
import { ArrowRight, Wallet, Shield, Zap, Fingerprint, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BananaScene from '@/components/common/BananaScene';
import CountdownTimer from './_components/CountdownTimer';

export default function Home() {
	return (
		<>
			{/* Hero Section */}
			<section className="ml-14 pt-14 min-h-screen grid grid-cols-12 relative">
				{/* 3D Logo Scene */}
				<div className="col-span-5 relative border-r border-border">
					<div className="sticky top-14 h-[calc(100vh-3.5rem)]">
						<BananaScene />
						<div className="absolute bottom-6 left-6 right-6 z-10">
							<p className="text-[10px] tracking-[0.25em] text-muted-foreground font-mono mb-1">SYMBOL / 01</p>
							<p className="text-xs text-foreground/60">The Critical Banana. Your ticket to the arena.</p>
						</div>
					</div>
				</div>

				{/* Content Column */}
				<div className="col-span-7 flex flex-col">
					<div className="flex-1 flex flex-col justify-center px-10 py-20 border-b border-border">
						<div className="mb-6">
							<span className="text-[10px] tracking-[0.3em] text-muted-foreground font-mono">
								BNB SMART CHAIN / ARENA PROTOCOL
							</span>
						</div>
						<h1 className="font-[family-name:var(--font-heading)] text-6xl lg:text-7xl xl:text-8xl font-bold leading-[0.85] tracking-tight mb-6">
							<span className="block">LIQUIDATE</span>
							<span className="block text-primary">THE CROWD.</span>
						</h1>
						<p className="text-base text-muted-foreground max-w-lg leading-relaxed mb-10 font-mono">
							1,000 Traders. 3 Lanes. 5 Minutes. Survival is a skill. The most crowded lane gets crushed — don{"'"}t be
							in it.
						</p>
						<div className="flex items-center gap-4">
							<Button
								size="lg"
								className="gap-2 text-xs tracking-[0.15em] bg-primary text-primary-foreground hover:bg-accent h-12 px-8 font-mono"
							>
								JOIN ACTIVE LOBBY
								<ArrowRight className="w-4 h-4" />
							</Button>
							<Button
								variant="outline"
								size="lg"
								className="gap-2 text-xs tracking-[0.15em] h-12 px-8 bg-transparent font-mono"
							>
								VIEW CONTRACT AUDIT
								<ExternalLink className="w-3 h-3" />
							</Button>
						</div>
					</div>

					{/* Live Data Ribbon */}
					<div className="grid grid-cols-4 border-b border-border">
						{[
							{ value: '12', label: 'ACTIVE LOBBIES', pulse: true },
							{ value: '14.5k', label: 'BNB PAID OUT', unit: 'BNB' },
							{ value: 'COUNTDOWN', label: 'NEXT CRUSH IN', isTimer: true },
							{ value: '10%', label: 'COMMISSION', sub: 'FLAT' },
						].map((stat, i) => (
							<div key={i} className="p-5 border-r border-border last:border-r-0 group hover:bg-card transition-colors">
								<div className="flex items-center gap-2 mb-1">
									{stat.pulse && (
										<span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
									)}
									<p className="font-[family-name:var(--font-heading)] text-2xl font-bold text-foreground">
										{stat.isTimer ? <CountdownTimer /> : stat.value}
									</p>
									{stat.unit && <span className="text-[10px] text-primary font-mono">{stat.unit}</span>}
									{stat.sub && <span className="text-[10px] text-muted-foreground font-mono">{stat.sub}</span>}
								</div>
								<p className="text-[10px] tracking-[0.2em] text-muted-foreground font-mono">{stat.label}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Rules of the Arena */}
			<section id="rules" className="ml-14 border-b border-border">
				<div className="grid grid-cols-12">
					<div className="col-span-3 border-r border-border p-8 flex flex-col justify-between min-h-[500px]">
						<div>
							<p className="text-[10px] tracking-[0.3em] text-muted-foreground font-mono mb-3">MECHANISM</p>
							<h2 className="font-[family-name:var(--font-heading)] text-4xl lg:text-5xl font-bold leading-[0.9]">
								<span className="block">RULES</span>
								<span className="block">OF THE</span>
								<span className="block text-primary">ARENA</span>
							</h2>
						</div>
						<p className="text-xs text-muted-foreground leading-relaxed font-mono">
							No luck. No RNG. Pure game theory and crowd psychology.
						</p>
					</div>
					<div className="col-span-9">
						<div className="grid grid-cols-2 grid-rows-2 h-full">
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
									className="border-b border-r border-border last:border-r-0 [&:nth-child(2)]:border-r-0 [&:nth-child(3)]:border-b-0 [&:nth-child(4)]:border-b-0 p-8 group hover:bg-card transition-colors relative overflow-hidden"
								>
									<span className="absolute -right-6 -bottom-10 text-[180px] font-bold text-border/20 select-none pointer-events-none leading-none">
										{mode.kanji}
									</span>
									<div className="relative z-10">
										<p className="text-[10px] tracking-[0.3em] text-primary mb-3 font-mono">
											STEP {mode.step}
										</p>
										<h3 className="font-[family-name:var(--font-heading)] text-xl font-bold mb-3 tracking-wide">
											{mode.title}
										</h3>
										<p className="text-sm text-muted-foreground leading-relaxed">{mode.desc}</p>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* Proof of Fairness */}
			<section id="proof" className="ml-14 border-b border-border">
				<div className="grid grid-cols-12">
					<div className="col-span-5 border-r border-border p-10 flex flex-col justify-center min-h-[500px]">
						<p className="text-[10px] tracking-[0.3em] text-muted-foreground font-mono mb-4">THE TERMINAL LOGIC</p>
						<h2 className="font-[family-name:var(--font-heading)] text-5xl lg:text-6xl font-bold leading-[0.85] mb-6">
							<span className="block">DETERMI&shy;</span>
							<span className="block">NISTIC.</span>
							<span className="block text-primary">NOT</span>
							<span className="block text-primary">RANDOM.</span>
						</h2>
						<p className="text-sm text-muted-foreground leading-relaxed mb-8">
							Critical Bananas uses zero RNG. Our logic is a transparent math engine. No AI black boxes. No house edge.
							Just player vs. player psychology.
						</p>
						<Button variant="outline" className="gap-2 text-[10px] tracking-[0.15em] bg-transparent w-fit font-mono">
							VIEW ON BSCSCAN
							<ExternalLink className="w-3 h-3" />
						</Button>
					</div>

					{/* Code Block */}
					<div className="col-span-7 bg-card p-10 flex flex-col justify-center">
						<p className="text-[10px] tracking-[0.3em] text-muted-foreground mb-4 font-mono">
							TOURNAMENT.SOL / PAYWINNERS()
						</p>
						<pre className="text-sm leading-relaxed font-mono overflow-x-auto">
							<code>
								<span className="text-muted-foreground">{'// Deterministic crush logic'}</span>
								{'\n'}
								<span className="text-primary">function</span>{' '}
								<span className="text-foreground">payWinners</span>
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
			<section id="specs" className="ml-14 border-b border-border">
				<div className="grid grid-cols-12">
					<div className="col-span-2 border-r border-border p-8">
						<p className="text-[10px] tracking-[0.25em] text-muted-foreground [writing-mode:vertical-lr] rotate-180 font-mono">
							PERFORMANCE
						</p>
					</div>
					<div className="col-span-10">
						<div className="grid grid-cols-3">
							{[
								{
									icon: <Fingerprint className="w-5 h-5" />,
									title: 'PASSKEY LOGIN',
									desc: 'No seed phrases. No extensions. Sign in with FaceID or TouchID and start playing in seconds.',
									stat: '0 CLICKS',
									statLabel: 'TO AUTHENTICATE',
								},
								{
									icon: <Zap className="w-5 h-5" />,
									title: 'SUB-SECOND SPEED',
									desc: 'Built on BNB Smart Chain. Your moves are recorded in 450ms. Settlement is instant.',
									stat: '450ms',
									statLabel: 'BLOCK CONFIRMATION',
								},
								{
									icon: <Shield className="w-5 h-5" />,
									title: 'NON-CUSTODIAL',
									desc: 'We never touch your keys. The Smart Contract handles the money. You handle the strategy.',
									stat: '100%',
									statLabel: 'YOUR CUSTODY',
								},
							].map((feat, i) => (
								<div
									key={i}
									className="border-r border-border last:border-r-0 p-8 hover:bg-card transition-colors group flex flex-col justify-between min-h-[350px]"
								>
									<div>
										<div className="w-10 h-10 border border-border flex items-center justify-center text-primary mb-6 group-hover:border-primary/40 transition-colors">
											{feat.icon}
										</div>
										<h3 className="font-[family-name:var(--font-heading)] text-lg font-bold mb-3 tracking-wide">
											{feat.title}
										</h3>
										<p className="text-sm text-muted-foreground leading-relaxed">{feat.desc}</p>
									</div>
									<div className="pt-6 border-t border-border mt-8">
										<p className="font-[family-name:var(--font-heading)] text-3xl font-bold text-primary">
											{feat.stat}
										</p>
										<p className="text-[10px] tracking-[0.2em] text-muted-foreground font-mono mt-1">
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
			<section className="ml-14 border-b border-border">
				<div className="grid grid-cols-12 min-h-[350px]">
					<div className="col-span-8 border-r border-border p-10 flex flex-col justify-center">
						<p className="text-[10px] tracking-[0.3em] text-muted-foreground font-mono mb-3">ENTER THE ARENA</p>
						<h2 className="font-[family-name:var(--font-heading)] text-4xl lg:text-5xl font-bold leading-[0.9] mb-8">
							The crowd is already
							<br />
							moving. <span className="text-primary">Pick your lane.</span>
						</h2>
						<div className="flex items-center gap-4">
							<Button
								size="lg"
								className="gap-2 text-xs tracking-[0.15em] bg-primary text-primary-foreground hover:bg-accent h-12 px-8 font-mono"
							>
								<Wallet className="w-4 h-4" />
								CONNECT WALLET
							</Button>
							<Button
								variant="outline"
								size="lg"
								className="gap-2 text-xs tracking-[0.15em] h-12 px-8 bg-transparent font-mono"
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
								className="flex-1 border-b border-border last:border-b-0 p-5 flex items-center justify-between hover:bg-card transition-colors group"
							>
								<div>
									<p className="text-[10px] tracking-[0.2em] text-muted-foreground font-mono mb-0.5">{social.label}</p>
									<p className="text-sm font-mono">{social.handle}</p>
								</div>
								<ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
							</Link>
						))}
					</div>
				</div>
			</section>
		</>
	);
}
