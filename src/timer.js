export default class Timer
{
    constructor(speed = 1, offset = 0)
    {
        this.speed = !isNaN(parseFloat(speed)) ? parseFloat((speed).toFixed(2)) : 1;
        this.offset = !isNaN(parseFloat(offset)) ? parseFloat((offset * 1000).toFixed(2)) : 0;

        this.reset();
    }

    reset()
    {
        this.startTime = NaN;
        this.pauseTime = NaN;
        this.isPaused = true;
    }

    start()
    {
        if (!isNaN(this.startTime)) return;

        this.startTime = Date.now() + this.offset;
        this.isPaused = false;
    }

    pause()
    {
        if (isNaN(this.startTime)) return;

        this.isPaused = !this.isPaused;

        if (this.isPaused)
        {
            this.pauseTime = Date.now();
        }
        else
        {
            this.startTime = Date.now() - (this.pauseTime - this.startTime);
            this.pauseTime = NaN;
        }
    }

    get time()
    {
        return (
            !isNaN(this.startTime) ?
            (
                (((!isNaN(this.pauseTime) ? this.pauseTime : Date.now()) - this.startTime) * this.speed) / 1000
            ) : 0
        );
    }
}
