import { prisma } from '@/lib/prisma';
import { Button } from '@/components/ui/button';

export default async function Home() {
  const temp = await prisma.temp.findMany();
  return (
    <div>
      <h1>Next starter</h1>
      <Button>Click me</Button>
      <pre>{JSON.stringify(temp, null, 2)}</pre>
    </div>
  );
}
