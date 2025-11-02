export const tailwindColors = [
	{ name: 'red', bg: 'bg-red-500', secondary: 'bg-red-500/20', border: 'border-red-500' },
	{
		name: 'orange',
		bg: 'bg-orange-500',
		secondary: 'bg-orange-500/20',
		border: 'border-orange-500'
	},
	{ name: 'amber', bg: 'bg-amber-500', secondary: 'bg-amber-500/20', border: 'border-amber-500' },
	{
		name: 'yellow',
		bg: 'bg-yellow-500',
		secondary: 'bg-yellow-500/20',
		border: 'border-yellow-500'
	},
	{ name: 'lime', bg: 'bg-lime-500', secondary: 'bg-lime-500/20', border: 'border-lime-500' },
	{ name: 'green', bg: 'bg-green-500', secondary: 'bg-green-500/20', border: 'border-green-500' },
	{
		name: 'emerald',
		bg: 'bg-emerald-500',
		secondary: 'bg-emerald-500/20',
		border: 'border-emerald-500'
	},
	{ name: 'teal', bg: 'bg-teal-500', secondary: 'bg-teal-500/20', border: 'border-teal-500' },
	{ name: 'cyan', bg: 'bg-cyan-500', secondary: 'bg-cyan-500/20', border: 'border-cyan-500' },
	{ name: 'sky', bg: 'bg-sky-500', secondary: 'bg-sky-500/20', border: 'border-sky-500' },
	{ name: 'blue', bg: 'bg-blue-500', secondary: 'bg-blue-500/20', border: 'border-blue-500' },
	{
		name: 'indigo',
		bg: 'bg-indigo-500',
		secondary: 'bg-indigo-500/20',
		border: 'border-indigo-500'
	},
	{
		name: 'violet',
		bg: 'bg-violet-500',
		secondary: 'bg-violet-500/20',
		border: 'border-violet-500'
	},
	{
		name: 'purple',
		bg: 'bg-purple-500',
		secondary: 'bg-purple-500/20',
		border: 'border-purple-500'
	},
	{
		name: 'fuchsia',
		bg: 'bg-fuchsia-500',
		secondary: 'bg-fuchsia-500/20',
		border: 'border-fuchsia-500'
	},
	{ name: 'pink', bg: 'bg-pink-500', secondary: 'bg-pink-500/20', border: 'border-pink-500' },
	{ name: 'rose', bg: 'bg-rose-500', secondary: 'bg-rose-500/20', border: 'border-rose-500' }
];

export function getColor(name: string) {
	let color = tailwindColors.find((c) => c.name === name);
	if (!color) {
		color = tailwindColors[0];
	}
	return color;
}

export function getColorByBorder(border: string) {
	let color = tailwindColors.find((c) => c.border === border);
	if (!color) {
		color = tailwindColors[0];
	}
	return color;
}
